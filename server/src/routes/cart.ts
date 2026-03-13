import express from 'express';
import {
  getCart,
  addToCart,
  removeFromCart
} from '../controllers/cartController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// All cart routes require authentication
router.use(verifyToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);

export default router;