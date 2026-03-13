import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import all models to ensure they are registered with Mongoose
import '../models/User';
import '../models/Planner';
import '../models/Event';
import '../models/Product';
import '../models/Order';
import '../models/Cart';
import '../models/Review';
import '../models/Message';

const createCollections = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not defined');
    }

    // Connect to MongoDB Atlas
    await mongoose.connect(mongoURI);

    console.log('✅ Connected to MongoDB Atlas');

    // Get database name from URI
    const dbName = mongoURI.split('/').pop()?.split('?')[0] || 'vaibhavam';
    const db = mongoose.connection.db;

    console.log(`📊 Database: ${dbName}`);

    // List of collections to create
    const collections = [
      'users',
      'planners',
      'events',
      'products',
      'orders',
      'carts',
      'reviews',
      'messages'
    ];

    // Check existing collections
    const existingCollections = await db.listCollections().toArray();
    const existingNames = existingCollections.map(col => col.name);

    console.log('\n📋 Collection Status:');

    for (const collection of collections) {
      if (existingNames.includes(collection)) {
        console.log(`✅ ${collection} - EXISTS`);
      } else {
        // Create collection if it doesn't exist
        await db.createCollection(collection);
        console.log(`🆕 ${collection} - CREATED`);
      }
    }

    // Create indexes for better performance
    console.log('\n🔧 Creating Indexes...');

    // Users collection indexes
    const usersCollection = db.collection('users');
    await usersCollection.createIndex({ email: 1 }, { unique: true });
    await usersCollection.createIndex({ role: 1 });
    console.log('✅ Users indexes created');

    // Planners collection indexes
    const plannersCollection = db.collection('planners');
    await plannersCollection.createIndex({ userId: 1 }, { unique: true });
    await plannersCollection.createIndex({ isApproved: 1 });
    await plannersCollection.createIndex({ 'location.city': 1 });
    await plannersCollection.createIndex({ rating: -1 });
    console.log('✅ Planners indexes created');

    // Events collection indexes
    const eventsCollection = db.collection('events');
    await eventsCollection.createIndex({ customerId: 1 });
    await eventsCollection.createIndex({ plannerId: 1 });
    await eventsCollection.createIndex({ date: 1 });
    await eventsCollection.createIndex({ status: 1 });
    console.log('✅ Events indexes created');

    // Products collection indexes
    const productsCollection = db.collection('products');
    await productsCollection.createIndex({ category: 1 });
    await productsCollection.createIndex({ isAvailable: 1 });
    await productsCollection.createIndex({ name: 'text', description: 'text' });
    console.log('✅ Products indexes created');

    // Orders collection indexes
    const ordersCollection = db.collection('orders');
    await ordersCollection.createIndex({ customerId: 1 });
    await ordersCollection.createIndex({ status: 1 });
    await ordersCollection.createIndex({ createdAt: -1 });
    console.log('✅ Orders indexes created');

    // Reviews collection indexes
    const reviewsCollection = db.collection('reviews');
    await reviewsCollection.createIndex({ eventId: 1 });
    await reviewsCollection.createIndex({ plannerId: 1 });
    await reviewsCollection.createIndex({ productId: 1 });
    await reviewsCollection.createIndex({ rating: -1 });
    console.log('✅ Reviews indexes created');

    // Messages collection indexes
    const messagesCollection = db.collection('messages');
    await messagesCollection.createIndex({ senderId: 1, receiverId: 1 });
    await messagesCollection.createIndex({ eventId: 1 });
    await messagesCollection.createIndex({ createdAt: -1 });
    console.log('✅ Messages indexes created');

    console.log('\n🎉 MongoDB Atlas collections and indexes created successfully!');
    console.log('\n📊 Collection Schemas:');
    console.log('1. users - User accounts with authentication');
    console.log('2. planners - Event planner profiles and services');
    console.log('3. events - Event bookings and planning data');
    console.log('4. products - Marketplace products for events');
    console.log('5. orders - Customer orders and transactions');
    console.log('6. carts - Shopping cart data');
    console.log('7. reviews - User reviews and ratings');
    console.log('8. messages - Real-time messaging between users');

  } catch (error) {
    console.error('❌ Error creating collections:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB Atlas');
  }
};

// Run the script
createCollections();