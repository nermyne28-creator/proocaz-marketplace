import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { hashPassword, comparePassword, generateToken, getUserFromRequest } from '@/lib/auth';
import { uploadToCloudinary } from '@/lib/cloudinary';
import { generateInvoicePDF } from '@/lib/pdf';
import { v4 as uuidv4 } from 'uuid';
import { registerSchema, loginSchema, createListingSchema, updateListingSchema, sendMessageSchema, updateTransactionStatusSchema } from '@/lib/validation';

// Helper function to handle errors
function errorResponse(message, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

// Helper to get user from token
function requireAuth(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    throw new Error('Unauthorized');
  }
  return user;
}

// Simple in-memory rate limiter (per IP+key)
const rateStore = new Map();
function rateLimit(request, key, limit = 60, windowMs = 60_000) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  const bucketKey = `${ip}:${key}`;
  const now = Date.now();
  const entry = rateStore.get(bucketKey) || { count: 0, resetAt: now + windowMs };
  if (now > entry.resetAt) {
    entry.count = 0;
    entry.resetAt = now + windowMs;
  }
  entry.count += 1;
  rateStore.set(bucketKey, entry);
  if (entry.count > limit) {
    throw new Error('Rate limit exceeded');
  }
}

// ===== AUTH ROUTES =====

async function handleRegister(request) {
  try {
    rateLimit(request, 'auth:register', 20, 60_000);
    const body = await request.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Données d\'inscription invalides');
    }
    const { email, password, company, siret, role } = parsed.data;

    if (!email || !password || !company) {
      return errorResponse('Email, mot de passe et entreprise requis');
    }

    const db = await connectDB();
    const users = db.collection('users');

    // Check if user exists
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return errorResponse('Cet email est déjà utilisé', 409);
    }

    // Create user
    const hashedPassword = hashPassword(password);
    const userId = uuidv4();
    const allowedRoles = ['buyer', 'seller', 'both'];
    const normalizedRole = allowedRoles.includes(role) ? role : 'buyer';

    const newUser = {
      id: userId,
      email,
      password: hashedPassword,
      company,
      siret: siret || '',
      role: normalizedRole,
      verified: false,
      createdAt: new Date().toISOString(),
    };

    await users.insertOne(newUser);

    const token = generateToken(userId, email, newUser.role);

    const secure = process.env.NODE_ENV === 'production';
    const cookie = `auth_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${secure ? '; Secure' : ''}`;
    return NextResponse.json(
      {
        message: 'Compte créé avec succès',
        token,
        user: {
          id: userId,
          email,
          company,
          role: newUser.role,
          verified: false,
        },
      },
      { headers: { 'Set-Cookie': cookie } }
    );
  } catch (error) {
    console.error('Register error:', error);
    return errorResponse('Erreur lors de la création du compte', 500);
  }
}

async function handleLogin(request) {
  try {
    rateLimit(request, 'auth:login', 50, 60_000);
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Email ou mot de passe invalide');
    }
    const { email, password } = parsed.data;

    if (!email || !password) {
      return errorResponse('Email et mot de passe requis');
    }

    const db = await connectDB();
    const users = db.collection('users');

    const user = await users.findOne({ email });
    if (!user) {
      return errorResponse('Email ou mot de passe incorrect', 401);
    }

    const isValid = comparePassword(password, user.password);
    if (!isValid) {
      return errorResponse('Email ou mot de passe incorrect', 401);
    }

    const token = generateToken(user.id, user.email, user.role);

    const secure = process.env.NODE_ENV === 'production';
    const cookie = `auth_token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Lax${secure ? '; Secure' : ''}`;
    return NextResponse.json(
      {
        message: 'Connexion réussie',
        token,
        user: {
          id: user.id,
          email: user.email,
          company: user.company,
          role: user.role,
          verified: user.verified,
        },
      },
      { headers: { 'Set-Cookie': cookie } }
    );
  } catch (error) {
    console.error('Login error:', error);
    return errorResponse('Erreur lors de la connexion', 500);
  }
}

async function handleGetMe(request) {
  try {
    const user = requireAuth(request);
    const db = await connectDB();
    const users = db.collection('users');

    const userData = await users.findOne({ id: user.userId });
    if (!userData) {
      return errorResponse('Utilisateur non trouvé', 404);
    }

    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      company: userData.company,
      siret: userData.siret,
      role: userData.role,
      verified: userData.verified,
    });
  } catch (error) {
    return errorResponse(error.message || 'Non autorisé', 401);
  }
}

// ===== LISTINGS ROUTES =====

async function handleGetListings(request) {
  try {
    const db = await connectDB();
    const listings = db.collection('listings');

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const condition = searchParams.get('condition');
    const location = searchParams.get('location');

    let query = { status: 'active' };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    if (condition) {
      query.condition = condition;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const results = await listings
      .find(query)
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray();

    return NextResponse.json({ listings: results });
  } catch (error) {
    console.error('Get listings error:', error);
    return errorResponse('Erreur lors de la récupération des annonces', 500);
  }
}

async function handleCreateListing(request) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `listings:create:${user.userId}`, 30, 60_000);
    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const price = formData.get('price');
    const condition = formData.get('condition');
    const location = formData.get('location');
    const images = formData.getAll('images');

    const parsed = createListingSchema.safeParse({ title, description, category, price, condition, location });
    if (!parsed.success) {
      return errorResponse('Données d\'annonce invalides');
    }

    const db = await connectDB();
    const listings = db.collection('listings');

    const listingId = uuidv4();
    const imageUrls = [];

    // Upload images to Cloudinary or local storage
    for (const image of images) {
      if (image && image.size > 0) {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSize = 10 * 1024 * 1024; // 10MB
        if (!allowedTypes.includes(image.type)) {
          continue;
        }
        if (image.size > maxSize) {
          continue;
        }
        try {
          const buffer = Buffer.from(await image.arrayBuffer());
          const imageUrl = await uploadToCloudinary(buffer, 'occasync/listings', image.type);
          imageUrls.push(imageUrl);
        } catch (uploadError) {
          console.error('Image upload error:', uploadError);
          // Continue without this image instead of failing
          continue;
        }
      }
    }

    const newListing = {
      id: listingId,
      title,
      description,
      category,
      price: parseFloat(price),
      condition: condition || 'good',
      location: location || '',
      images: imageUrls,
      sellerId: user.userId,
      status: 'active',
      views: 0,
      createdAt: new Date().toISOString(),
    };

    await listings.insertOne(newListing);

    return NextResponse.json({
      message: 'Annonce créée avec succès',
      listing: newListing,
    });
  } catch (error) {
    console.error('Create listing error:', error);
    return errorResponse(error.message || 'Erreur lors de la création de l\'annonce', 500);
  }
}

async function handleGetListing(request, id) {
  try {
    const db = await connectDB();
    const listings = db.collection('listings');

    const listing = await listings.findOne({ id });
    if (!listing) {
      return errorResponse('Annonce non trouvée', 404);
    }

    // Increment views
    await listings.updateOne({ id }, { $inc: { views: 1 } });

    // Get seller info
    const users = db.collection('users');
    const seller = await users.findOne({ id: listing.sellerId });

    return NextResponse.json({
      listing: {
        ...listing,
        seller: seller
          ? {
            id: seller.id,
            company: seller.company,
            verified: seller.verified,
          }
          : null,
      },
    });
  } catch (error) {
    console.error('Get listing error:', error);
    return errorResponse('Erreur lors de la récupération de l\'annonce', 500);
  }
}

async function handleUpdateListing(request, id) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `listings:update:${user.userId}`, 60, 60_000);
    const body = await request.json();

    const db = await connectDB();
    const listings = db.collection('listings');

    const listing = await listings.findOne({ id });
    if (!listing) {
      return errorResponse('Annonce non trouvée', 404);
    }

    if (listing.sellerId !== user.userId) {
      return errorResponse('Non autorisé', 403);
    }

    const parsed = updateListingSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Données de mise à jour invalides');
    }
    await listings.updateOne({ id }, { $set: { ...parsed.data, updatedAt: new Date().toISOString() } });

    return NextResponse.json({ message: 'Annonce mise à jour' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la mise à jour', 500);
  }
}

async function handleDeleteListing(request, id) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `listings:delete:${user.userId}`, 20, 60_000);
    const db = await connectDB();
    const listings = db.collection('listings');

    const listing = await listings.findOne({ id });
    if (!listing) {
      return errorResponse('Annonce non trouvée', 404);
    }

    if (listing.sellerId !== user.userId && user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    await listings.deleteOne({ id });

    return NextResponse.json({ message: 'Annonce supprimée' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la suppression', 500);
  }
}

// ===== MESSAGES ROUTES =====

async function handleGetMessages(request) {
  try {
    const user = requireAuth(request);
    const { searchParams } = new URL(request.url);
    const conversationId = searchParams.get('conversationId');

    const db = await connectDB();
    const messages = db.collection('messages');

    let query = {
      $or: [{ senderId: user.userId }, { receiverId: user.userId }],
    };

    if (conversationId) {
      query.conversationId = conversationId;
    }

    const results = await messages
      .find(query)
      .sort({ createdAt: 1 })
      .toArray();

    return NextResponse.json({ messages: results });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération des messages', 500);
  }
}

async function handleSendMessage(request) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `messages:send:${user.userId}`, 120, 60_000);
    const body = await request.json();
    const parsed = sendMessageSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Données de message invalides');
    }
    const { receiverId, listingId, content } = parsed.data;

    if (!receiverId || !content) {
      return errorResponse('Destinataire et message requis');
    }

    const db = await connectDB();
    const messages = db.collection('messages');

    const conversationId = [user.userId, receiverId].sort().join('-');
    const messageId = uuidv4();

    const newMessage = {
      id: messageId,
      conversationId,
      senderId: user.userId,
      receiverId,
      listingId: listingId || null,
      content,
      read: false,
      createdAt: new Date().toISOString(),
    };

    await messages.insertOne(newMessage);

    return NextResponse.json({
      message: 'Message envoyé',
      data: newMessage,
    });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de l\'envoi du message', 500);
  }
}

async function handleGetConversations(request) {
  try {
    const user = requireAuth(request);
    const db = await connectDB();
    const messages = db.collection('messages');

    const allMessages = await messages
      .find({
        $or: [{ senderId: user.userId }, { receiverId: user.userId }],
      })
      .sort({ createdAt: -1 })
      .toArray();

    // Group by conversation
    const conversationsMap = new Map();
    for (const msg of allMessages) {
      if (!conversationsMap.has(msg.conversationId)) {
        conversationsMap.set(msg.conversationId, {
          conversationId: msg.conversationId,
          lastMessage: msg,
          unreadCount: msg.receiverId === user.userId && !msg.read ? 1 : 0,
        });
      } else {
        const conv = conversationsMap.get(msg.conversationId);
        if (msg.receiverId === user.userId && !msg.read) {
          conv.unreadCount++;
        }
      }
    }

    const conversations = Array.from(conversationsMap.values());

    return NextResponse.json({ conversations });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération des conversations', 500);
  }
}

// ===== TRANSACTIONS ROUTES =====

async function handleGetTransactions(request) {
  try {
    const user = requireAuth(request);
    const db = await connectDB();
    const transactions = db.collection('transactions');

    const results = await transactions
      .find({
        $or: [{ buyerId: user.userId }, { sellerId: user.userId }],
      })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ transactions: results });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération des transactions', 500);
  }
}

async function handleCreateTransaction(request) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `transactions:create:${user.userId}`, 20, 60_000);
    const body = await request.json();
    const { listingId } = body;

    if (!listingId) {
      return errorResponse('ID de l\'annonce requis');
    }

    const db = await connectDB();
    const listings = db.collection('listings');
    const transactions = db.collection('transactions');

    const listing = await listings.findOne({ id: listingId });
    if (!listing) {
      return errorResponse('Annonce non trouvée', 404);
    }

    if (listing.sellerId === user.userId) {
      return errorResponse('Vous ne pouvez pas acheter votre propre annonce', 400);
    }

    const transactionId = uuidv4();
    const invoiceNumber = `INV-${Date.now()}`;

    const newTransaction = {
      id: transactionId,
      listingId,
      buyerId: user.userId,
      sellerId: listing.sellerId,
      amount: listing.price,
      status: 'pending',
      invoiceNumber,
      invoiceUrl: null,
      createdAt: new Date().toISOString(),
    };

    await transactions.insertOne(newTransaction);

    // Simulate payment processing
    setTimeout(async () => {
      try {
        await transactions.updateOne(
          { id: transactionId },
          { $set: { status: 'paid', paidAt: new Date().toISOString() } }
        );
      } catch (err) {
        console.error('Error updating transaction:', err);
      }
    }, 2000);

    return NextResponse.json({
      message: 'Transaction créée avec succès',
      transaction: newTransaction,
    });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la création de la transaction', 500);
  }
}

async function handleUpdateTransactionStatus(request, id) {
  try {
    const user = requireAuth(request);
    rateLimit(request, `transactions:update:${user.userId}`, 60, 60_000);
    const body = await request.json();
    const parsed = updateTransactionStatusSchema.safeParse(body);
    if (!parsed.success) {
      return errorResponse('Statut invalide');
    }
    const { status } = parsed.data;

    const db = await connectDB();
    const transactions = db.collection('transactions');

    const transaction = await transactions.findOne({ id });
    if (!transaction) {
      return errorResponse('Transaction non trouvée', 404);
    }

    if (transaction.sellerId !== user.userId && user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    await transactions.updateOne(
      { id },
      { $set: { status, updatedAt: new Date().toISOString() } }
    );

    return NextResponse.json({ message: 'Statut mis à jour' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la mise à jour', 500);
  }
}

// ===== ADMIN ROUTES =====

async function handleGetAllUsers(request) {
  try {
    const user = requireAuth(request);
    if (user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const db = await connectDB();
    const users = db.collection('users');

    const results = await users
      .find({}, { projection: { password: 0 } })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ users: results });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération des utilisateurs', 500);
  }
}

async function handleVerifyUser(request) {
  try {
    const user = requireAuth(request);
    if (user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const body = await request.json();
    const { userId, verified } = body;

    const db = await connectDB();
    const users = db.collection('users');

    await users.updateOne({ id: userId }, { $set: { verified } });

    return NextResponse.json({ message: 'Utilisateur mis à jour' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la vérification', 500);
  }
}

async function handleGetAllListings(request) {
  try {
    const user = requireAuth(request);
    if (user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const db = await connectDB();
    const listings = db.collection('listings');

    const results = await listings
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ listings: results });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération', 500);
  }
}

async function handleGetAllTransactions(request) {
  try {
    const user = requireAuth(request);
    if (user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const db = await connectDB();
    const transactions = db.collection('transactions');

    const results = await transactions
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ transactions: results });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la récupération', 500);
  }
}

async function handleModerateListing(request) {
  try {
    const user = requireAuth(request);
    if (user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const body = await request.json();
    const { listingId, status } = body;

    const db = await connectDB();
    const listings = db.collection('listings');

    await listings.updateOne({ id: listingId }, { $set: { status } });

    return NextResponse.json({ message: 'Annonce modérée' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur lors de la modération', 500);
  }
}

// ===== PDF INVOICE ROUTES =====

async function handleGenerateInvoice(request, transactionId) {
  try {
    const user = requireAuth(request);
    const db = await connectDB();

    const transactions = db.collection('transactions');
    const users = db.collection('users');
    const listings = db.collection('listings');

    const transaction = await transactions.findOne({ id: transactionId });
    if (!transaction) {
      return errorResponse('Transaction non trouvée', 404);
    }

    // Verify user is buyer or seller or admin
    if (transaction.buyerId !== user.userId &&
      transaction.sellerId !== user.userId &&
      user.role !== 'admin') {
      return errorResponse('Non autorisé', 403);
    }

    const listing = await listings.findOne({ id: transaction.listingId });
    const buyer = await users.findOne({ id: transaction.buyerId });
    const seller = await users.findOne({ id: transaction.sellerId });

    if (!listing || !buyer || !seller) {
      return errorResponse('Données incomplètes', 404);
    }

    const pdfBuffer = generateInvoicePDF(transaction, listing, buyer, seller);

    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="facture-${transaction.invoiceNumber}.pdf"`,
      },
    });
  } catch (error) {
    console.error('Generate invoice error:', error);
    return errorResponse(error.message || 'Erreur lors de la génération', 500);
  }
}

// ===== MESSAGE HELPER ROUTES =====

async function handleMarkMessageAsRead(request) {
  try {
    const user = requireAuth(request);
    const body = await request.json();
    const { messageId } = body;

    const db = await connectDB();
    const messages = db.collection('messages');

    const message = await messages.findOne({ id: messageId });
    if (!message) {
      return errorResponse('Message non trouvé', 404);
    }

    if (message.receiverId !== user.userId) {
      return errorResponse('Non autorisé', 403);
    }

    await messages.updateOne({ id: messageId }, { $set: { read: true } });

    return NextResponse.json({ message: 'Message marqué comme lu' });
  } catch (error) {
    return errorResponse(error.message || 'Erreur', 500);
  }
}

async function handleGetUnreadCount(request) {
  try {
    const user = requireAuth(request);
    const db = await connectDB();
    const messages = db.collection('messages');

    const count = await messages.countDocuments({
      receiverId: user.userId,
      read: false,
    });

    return NextResponse.json({ unreadCount: count });
  } catch (error) {
    return errorResponse(error.message || 'Erreur', 500);
  }
}

// ===== MAIN ROUTER =====

export async function GET(request, { params }) {
  const path = params?.path?.join('/') || '';

  // Root endpoint
  if (!path) {
    return NextResponse.json({ message: 'OccaSync API - Marketplace B2B d\'occasion' });
  }

  // Auth routes
  if (path === 'auth/me') {
    return handleGetMe(request);
  }

  // Listings routes
  if (path === 'listings') {
    return handleGetListings(request);
  }
  if (path.startsWith('listings/')) {
    const id = path.split('/')[1];
    return handleGetListing(request, id);
  }

  // Messages routes
  if (path === 'messages') {
    return handleGetMessages(request);
  }
  if (path === 'conversations') {
    return handleGetConversations(request);
  }

  // Transactions routes
  if (path === 'transactions') {
    return handleGetTransactions(request);
  }

  // Admin routes
  if (path === 'admin/users') {
    return handleGetAllUsers(request);
  }
  if (path === 'admin/listings') {
    return handleGetAllListings(request);
  }
  if (path === 'admin/transactions') {
    return handleGetAllTransactions(request);
  }

  // Messages helper routes
  if (path === 'messages/unread-count') {
    return handleGetUnreadCount(request);
  }

  // Invoice routes
  if (path.startsWith('invoices/')) {
    const transactionId = path.split('/')[1];
    return handleGenerateInvoice(request, transactionId);
  }

  return errorResponse('Route non trouvée', 404);
}

export async function POST(request, { params }) {
  const path = params?.path?.join('/') || '';

  // Auth routes
  if (path === 'auth/register') {
    return handleRegister(request);
  }
  if (path === 'auth/login') {
    return handleLogin(request);
  }

  // Listings routes
  if (path === 'listings') {
    return handleCreateListing(request);
  }

  // Messages routes
  if (path === 'messages') {
    return handleSendMessage(request);
  }

  // Transactions routes
  if (path === 'transactions') {
    return handleCreateTransaction(request);
  }

  // Admin routes
  if (path === 'admin/verify-user') {
    return handleVerifyUser(request);
  }
  if (path === 'admin/moderate-listing') {
    return handleModerateListing(request);
  }

  // Messages routes
  if (path === 'messages/mark-read') {
    return handleMarkMessageAsRead(request);
  }

  return errorResponse('Route non trouvée', 404);
}

export async function PUT(request, { params }) {
  const path = params?.path?.join('/') || '';

  // Listings routes
  if (path.startsWith('listings/')) {
    const id = path.split('/')[1];
    return handleUpdateListing(request, id);
  }

  // Transactions routes
  if (path.startsWith('transactions/') && path.endsWith('/status')) {
    const id = path.split('/')[1];
    return handleUpdateTransactionStatus(request, id);
  }

  return errorResponse('Route non trouvée', 404);
}

export async function DELETE(request, { params }) {
  const path = params?.path?.join('/') || '';

  // Listings routes
  if (path.startsWith('listings/')) {
    const id = path.split('/')[1];
    return handleDeleteListing(request, id);
  }

  return errorResponse('Route non trouvée', 404);
}
