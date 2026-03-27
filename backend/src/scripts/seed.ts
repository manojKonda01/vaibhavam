import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import connectDB from '../config/db';

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@vaibhavam.com',
    password: 'password123',
    role: 'admin',
  },
  {
    name: 'Customer 1',
    email: 'customer@vaibhavam.com',
    password: 'password123',
    role: 'customer',
  },
  {
    name: 'Planner 1',
    email: 'planner@vaibhavam.com',
    password: 'password123',
    role: 'planner',
  }
];

const importData = async () => {
  try {
    await connectDB();

    await User.deleteMany();
    await User.insertMany(users);

    console.log('✅ Data Imported with Default Users!');
    process.exit();
  } catch (error) {
    console.error('❌ Error with data import:', error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();

    await User.deleteMany();

    console.log('✅ Data Destroyed Successfully (Rollback)!');
    process.exit();
  } catch (error) {
    console.error('❌ Error with data destruction:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
