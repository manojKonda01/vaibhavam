import express from 'express';
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productController';
import { verifyToken, requireRole, optionalAuth } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);

// Admin only routes
router.post('/', verifyToken, requireRole(['ADMIN']), createProduct);
router.put('/:id', verifyToken, requireRole(['ADMIN']), updateProduct);
router.delete('/:id', verifyToken, requireRole(['ADMIN']), deleteProduct);

export default router;