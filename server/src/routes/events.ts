import express from 'express';
import {
  createEvent,
  getEvents,
  getEventById,
  updateEventStatus
} from '../controllers/eventController';
import { verifyToken, requireRole } from '../middlewares/auth';

const router = express.Router();

// All event routes require authentication
router.use(verifyToken);

router.post('/', createEvent);
router.get('/', getEvents);
router.get('/:id', getEventById);
router.put('/:id/status', requireRole(['planner', 'admin']), updateEventStatus);

export default router;