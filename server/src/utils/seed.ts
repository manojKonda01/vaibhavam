import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import Planner from '../models/Planner';
import Product from '../models/Product';
import connectDB from '../config/database';

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Planner.deleteMany({});
    await Product.deleteMany({});

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'admin@vaibhavam.com',
      password: 'admin123',
      role: 'admin'
    });
    await admin.save();

    // Create sample customers
    const customer1 = new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'customer',
      phone: '+1234567890',
      address: {
        street: '123 Main St',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA'
      }
    });
    await customer1.save();

    const customer2 = new User({
      name: 'Jane Smith',
      email: 'jane@example.com',
      password: 'password123',
      role: 'customer'
    });
    await customer2.save();

    // Create sample planners
    const plannerUser1 = new User({
      name: 'Sarah Johnson',
      email: 'sarah@events.com',
      password: 'password123',
      role: 'planner'
    });
    await plannerUser1.save();

    const planner1 = new Planner({
      userId: plannerUser1._id,
      businessName: 'Elegant Events by Sarah',
      description: 'Creating magical moments for your special occasions. Specializing in weddings and corporate events.',
      location: {
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA'
      },
      rating: 4.8,
      portfolioImages: [
        'https://res.cloudinary.com/demo/image/upload/v1234567890/wedding1.jpg',
        'https://res.cloudinary.com/demo/image/upload/v1234567890/corporate1.jpg'
      ],
      services: ['Wedding Planning', 'Corporate Events', 'Birthday Parties'],
      experience: 8,
      isApproved: true
    });
    await planner1.save();

    const plannerUser2 = new User({
      name: 'Mike Chen',
      email: 'mike@celebrations.com',
      password: 'password123',
      role: 'planner'
    });
    await plannerUser2.save();

    const planner2 = new Planner({
      userId: plannerUser2._id,
      businessName: 'Chen Event Productions',
      description: 'Full-service event planning with attention to every detail. From concept to execution.',
      location: {
        city: 'San Francisco',
        state: 'CA',
        country: 'USA'
      },
      rating: 4.9,
      portfolioImages: [
        'https://res.cloudinary.com/demo/image/upload/v1234567890/birthday1.jpg',
        'https://res.cloudinary.com/demo/image/upload/v1234567890/festival1.jpg'
      ],
      services: ['Festival Planning', 'Birthday Celebrations', 'Luxury Events'],
      experience: 12,
      isApproved: true
    });
    await planner2.save();

    // Create sample products
    const products = [
      {
        name: 'Crystal Chandelier',
        category: 'lighting',
        price: 299.99,
        rentPrice: 49.99,
        stock: 5,
        images: ['https://res.cloudinary.com/demo/image/upload/v1234567890/chandelier.jpg'],
        description: 'Elegant crystal chandelier perfect for wedding venues and luxury events.'
      },
      {
        name: 'Gold-Plated Chairs (Set of 10)',
        category: 'furniture',
        price: 499.99,
        rentPrice: 79.99,
        stock: 20,
        images: ['https://res.cloudinary.com/demo/image/upload/v1234567890/chairs.jpg'],
        description: 'Luxurious gold-plated chairs for your special event seating.'
      },
      {
        name: 'LED String Lights',
        category: 'decorations',
        price: 89.99,
        rentPrice: 19.99,
        stock: 15,
        images: ['https://res.cloudinary.com/demo/image/upload/v1234567890/lights.jpg'],
        description: 'Beautiful LED string lights to create magical ambiance.'
      },
      {
        name: 'Floral Centerpieces (Set of 12)',
        category: 'decorations',
        price: 199.99,
        rentPrice: 39.99,
        stock: 8,
        images: ['https://res.cloudinary.com/demo/image/upload/v1234567890/flowers.jpg'],
        description: 'Stunning floral centerpieces for wedding and event tables.'
      }
    ];

    for (const productData of products) {
      const product = new Product(productData);
      await product.save();
    }

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();