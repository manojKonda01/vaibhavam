import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connectDB();

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ message: 'Vaibhavam API is running gracefully 🖤' });
});

// Import Routes
import authRoutes from './routes/authRoutes';
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
