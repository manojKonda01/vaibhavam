import express from 'express';
import {
  getPlanners,
  getPlannerById,
  createOrUpdateProfile,
  uploadPortfolio
} from '../controllers/plannerController';
import { verifyToken, requireRole, optionalAuth } from '../middlewares/auth';

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getPlanners);
router.get('/:id', optionalAuth, getPlannerById);

// Protected routes (planners only)
router.post('/profile', verifyToken, requireRole(['PLANNER']), createOrUpdateProfile);
router.post('/portfolio', verifyToken, requireRole(['PLANNER']), uploadPortfolio);

export default router;