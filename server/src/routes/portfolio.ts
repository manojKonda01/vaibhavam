import express, { Request, Response } from 'express';
import PortfolioItem from '../models/PortfolioItem';
import Planner from '../models/Planner';
import { verifyToken, requireRole } from '../middlewares/auth';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

const router = express.Router();

// GET portfolio items for a planner
router.get('/planner/:plannerId', async (req: Request, res: Response): Promise<void> => {
  try {
    const { plannerId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const portfolioItems = await PortfolioItem.find({ plannerId })
      .sort({ eventDate: -1 })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number));

    const total = await PortfolioItem.countDocuments({ plannerId });

    res.json({
      portfolioItems,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get portfolio items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single portfolio item
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await PortfolioItem.findById(id)
      .populate('plannerId', 'displayName location rating');

    if (!item) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    res.json(item);
  } catch (error) {
    console.error('Get portfolio item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE portfolio item
router.post('/', verifyToken, requireRole(['PLANNER']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, eventType, location, eventDate, imageUrls } = req.body;

    // Validate required fields
    if (!title || !description || !eventType || !location || !eventDate || !imageUrls?.length) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Get planner profile
    const planner = await Planner.findOne({ userId: req.user?.userId });
    if (!planner) {
      res.status(404).json({ message: 'Planner profile not found' });
      return;
    }

    const portfolioItem = new PortfolioItem({
      plannerId: planner._id,
      title,
      description,
      eventType,
      location,
      eventDate: new Date(eventDate),
      imageUrls: Array.isArray(imageUrls) ? imageUrls : [imageUrls]
    });

    await portfolioItem.save();

    res.status(201).json({
      message: 'Portfolio item created successfully',
      portfolioItem
    });
  } catch (error) {
    console.error('Create portfolio item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE portfolio item
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, eventType, location, eventDate, imageUrls } = req.body;

    const item = await PortfolioItem.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    // Check authorization
    const planner = await Planner.findById(item.plannerId);
    if (planner?.userId.toString() !== req.user?.userId && req.user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Unauthorized to update this portfolio item' });
      return;
    }

    // Update fields
    if (title) item.title = title;
    if (description) item.description = description;
    if (eventType) item.eventType = eventType;
    if (location) item.location = location;
    if (eventDate) item.eventDate = new Date(eventDate);
    if (imageUrls) item.imageUrls = Array.isArray(imageUrls) ? imageUrls : [imageUrls];

    await item.save();

    res.json({
      message: 'Portfolio item updated successfully',
      portfolioItem: item
    });
  } catch (error) {
    console.error('Update portfolio item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE portfolio item
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const item = await PortfolioItem.findById(id);
    if (!item) {
      res.status(404).json({ message: 'Portfolio item not found' });
      return;
    }

    // Check authorization
    const planner = await Planner.findById(item.plannerId);
    if (planner?.userId.toString() !== req.user?.userId && req.user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Unauthorized to delete this portfolio item' });
      return;
    }

    await PortfolioItem.findByIdAndDelete(id);

    res.json({ message: 'Portfolio item deleted successfully' });
  } catch (error) {
    console.error('Delete portfolio item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;