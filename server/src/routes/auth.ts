import express from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
  getProfile
} from '../controllers/authController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refreshToken);

// Protected routes
router.post('/logout', verifyToken, logout);
router.get('/me', verifyToken, getProfile);

export default router;