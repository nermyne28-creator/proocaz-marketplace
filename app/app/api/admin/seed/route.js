import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/db'
import { hashPassword } from '@/lib/auth'

export async function POST(request) {
  try {
    const secret = process.env.SEED_SECRET
    if (!secret) return NextResponse.json({ error: 'Seed non configuré' }, { status: 400 })
    const provided = request.headers.get('x-seed-secret')
    if (provided !== secret) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

    const adminEmail = process.env.SEED_ADMIN_EMAIL
    const adminPassword = process.env.SEED_ADMIN_PASSWORD
    const adminCompany = process.env.SEED_ADMIN_COMPANY || 'OccaSync Admin'
    if (!adminEmail || !adminPassword) {
      return NextResponse.json({ error: 'Email/mot de passe admin manquants' }, { status: 400 })
    }

    const db = await connectDB()
    const users = db.collection('users')
    const listings = db.collection('listings')

    const exists = await users.findOne({ email: adminEmail })
    if (!exists) {
      await users.insertOne({
        id: `admin-${Date.now()}`,
        email: adminEmail,
        password: hashPassword(adminPassword),
        company: adminCompany,
        siret: '',
        role: 'admin',
        verified: true,
        createdAt: new Date().toISOString(),
      })
    }

    const sample = await listings.findOne({ title: 'Laptop Dell i7' })
    if (!sample) {
      await listings.insertOne({
        id: `listing-${Date.now()}`,
        title: 'Laptop Dell i7',
        description: '16GB RAM, 512GB SSD, excellent état',
        category: 'informatique',
        price: 850,
        condition: 'excellent',
        location: 'Paris, France',
        images: [],
        sellerId: exists?.id || 'seed-seller',
        status: 'active',
        views: 0,
        createdAt: new Date().toISOString(),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}

