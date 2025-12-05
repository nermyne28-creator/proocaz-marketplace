import { MongoClient } from 'mongodb';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const uri = process.env.MONGO_URL;
const dbName = process.env.DB_NAME || 'occasync';

let client = null;
let db = null;

// File-based persistence for in-memory fallback
const DATA_FILE = join(process.cwd(), '.data', 'db.json');

function loadData() {
  try {
    if (existsSync(DATA_FILE)) {
      const data = JSON.parse(readFileSync(DATA_FILE, 'utf-8'));
      return new Map(Object.entries(data));
    }
  } catch (e) {
    console.error('Error loading data:', e);
  }
  return new Map();
}

function saveData(store) {
  try {
    const dir = join(process.cwd(), '.data');
    if (!existsSync(dir)) {
      require('fs').mkdirSync(dir, { recursive: true });
    }
    const data = {};
    for (const [key, value] of store.entries()) {
      data[key] = value;
    }
    writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
  } catch (e) {
    console.error('Error saving data:', e);
  }
}

// Initialize from file
const memoryStore = loadData();

function matchFilter(doc, filter) {
  if (!filter || Object.keys(filter).length === 0) return true;
  const keys = Object.keys(filter);
  for (const k of keys) {
    if (k === '$or') {
      const arr = filter['$or'] || [];
      if (!arr.some((f) => matchFilter(doc, f))) return false;
      continue;
    }
    const val = filter[k];
    if (val && typeof val === 'object' && ('$regex' in val)) {
      const regex = val['$regex'];
      const opts = val['$options'] || '';
      const re = new RegExp(regex, opts);
      if (!re.test(String(doc[k] || ''))) return false;
      continue;
    }
    if (val && typeof val === 'object' && (('$gte' in val) || ('$lte' in val))) {
      const v = doc[k];
      if ('$gte' in val && !(v >= val['$gte'])) return false;
      if ('$lte' in val && !(v <= val['$lte'])) return false;
      continue;
    }
    if (doc[k] !== val) return false;
  }
  return true;
}

function collectionWrapper(name) {
  if (!memoryStore.has(name)) memoryStore.set(name, []);
  const arr = memoryStore.get(name);

  const persist = () => saveData(memoryStore);

  return {
    find(filter) {
      let results = arr.filter((d) => matchFilter(d, filter || {}));
      const chain = {
        sort(sortObj) {
          const [[key, dir]] = Object.entries(sortObj || {});
          if (key) {
            results = results.sort((a, b) => {
              const av = a[key];
              const bv = b[key];
              return (dir === -1 ? (bv > av) - (bv < av) : (av > bv) - (av < bv));
            });
          }
          return chain;
        },
        limit(n) { results = results.slice(0, n); return chain; },
        toArray() { return Promise.resolve(results); },
      };
      return chain;
    },
    findOne(filter) { return Promise.resolve(arr.find((d) => matchFilter(d, filter || {})) || null); },
    insertOne(doc) {
      arr.push(doc);
      persist();
      return Promise.resolve({ insertedId: doc.id || null });
    },
    updateOne(filter, update) {
      const idx = arr.findIndex((d) => matchFilter(d, filter || {}));
      if (idx === -1) return Promise.resolve({ matchedCount: 0, modifiedCount: 0 });
      const target = arr[idx];
      if (update && update['$set']) {
        Object.assign(target, update['$set']);
      }
      if (update && update['$inc']) {
        for (const [k, v] of Object.entries(update['$inc'])) {
          target[k] = (target[k] || 0) + v;
        }
      }
      arr[idx] = target;
      persist();
      return Promise.resolve({ matchedCount: 1, modifiedCount: 1 });
    },
    deleteOne(filter) {
      const idx = arr.findIndex((d) => matchFilter(d, filter || {}));
      if (idx === -1) return Promise.resolve({ deletedCount: 0 });
      arr.splice(idx, 1);
      persist();
      return Promise.resolve({ deletedCount: 1 });
    },
    countDocuments(filter) { return Promise.resolve(arr.filter((d) => matchFilter(d, filter || {})).length); },
  };
}

export async function connectDB() {
  if (db) return db;
  if (uri) {
    try {
      client = new MongoClient(uri);
      await client.connect();
      db = client.db(dbName);
      try {
        await db.collection('users').createIndex({ email: 1 }, { unique: true });
        await db.collection('users').createIndex({ id: 1 }, { unique: true });
        await db.collection('listings').createIndex({ id: 1 }, { unique: true });
        await db.collection('listings').createIndex({ status: 1, createdAt: -1 });
        await db.collection('messages').createIndex({ conversationId: 1 });
        await db.collection('messages').createIndex({ receiverId: 1, read: 1 });
        await db.collection('transactions').createIndex({ id: 1 }, { unique: true });
        await db.collection('transactions').createIndex({ buyerId: 1 });
        await db.collection('transactions').createIndex({ sellerId: 1 });
      } catch { }
      return db;
    } catch { }
  }
  // Use file-backed in-memory database
  const memDb = {
    databaseName: 'filebacked',
    collection(name) { return collectionWrapper(name); },
  };
  db = memDb;
  console.log('Using file-backed database (no MongoDB configured)');
  return db;
}

export function getDB() {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
}
