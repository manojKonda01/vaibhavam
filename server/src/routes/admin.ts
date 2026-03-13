import express from 'express';
import {
  getUsers,
  getPlanners,
  approvePlanner,
  getDashboardStats
} from '../controllers/adminController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = express.Router();

// All admin routes require admin role
router.use(verifyToken);
router.use(requireRole(['admin']));

router.get('/users', getUsers);
router.get('/planners', getPlanners);
router.put('/approve-planner/:id', approvePlanner);
router.get('/dashboard', getDashboardStats);

export default router;