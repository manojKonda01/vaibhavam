import express from 'express';
import {
  createOrder,
  getOrders
} from '../controllers/orderController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

// All order routes require authentication
router.use(verifyToken);

router.post('/', createOrder);
router.get('/', getOrders);

export default router;