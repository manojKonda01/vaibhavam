import express, { Request, Response } from 'express';
import MarketplaceListing from '../models/MarketplaceListing';
import Planner from '../models/Planner';
import { verifyToken, requireRole, AuthRequest } from '../middlewares/auth';

const router = express.Router();

// GET all listings with filters
router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, eventType, minPrice, maxPrice, location, plannerId, isFeatured } = req.query;

    const query: any = { isActive: true };

    if (eventType) query.eventType = eventType;
    if (minPrice) query.priceFrom = { $lte: parseInt(minPrice as string) };
    if (maxPrice) query.priceTo = { $gte: parseInt(maxPrice as string) };
    if (location) query.location = new RegExp(location as string, 'i');
    if (plannerId) query.plannerId = plannerId;
    if (isFeatured === 'true') query.isFeatured = true;

    const listings = await MarketplaceListing.find(query)
      .populate('plannerId', 'displayName location rating')
      .sort({ isFeatured: -1, createdAt: -1 })
      .limit((limit as number) * 1)
      .skip(((page as number) - 1) * (limit as number));

    const total = await MarketplaceListing.countDocuments(query);

    res.json({
      listings,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get listings error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single listing
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const listing = await MarketplaceListing.findById(id)
      .populate('plannerId', 'displayName bio location rating experienceYears specialties profileImageUrl');

    if (!listing) {
      res.status(404).json({ message: 'Listing not found' });
      return;
    }

    res.json(listing);
  } catch (error) {
    console.error('Get listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// CREATE listing (planners only)
router.post('/', verifyToken, requireRole(['PLANNER']), async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { title, description, eventType, priceFrom, priceTo, currency, coverImageUrl, isFeatured } = req.body;

    // Validate required fields
    if (!title || !description || !eventType || !priceFrom || !priceTo) {
      res.status(400).json({ message: 'Missing required fields' });
      return;
    }

    // Get planner profile
    const planner = await Planner.findOne({ userId: req.user?.userId });
    if (!planner) {
      res.status(404).json({ message: 'Planner profile not found. Please create a profile first.' });
      return;
    }

    const listing = new MarketplaceListing({
      plannerId: planner._id,
      title,
      description,
      eventType,
      priceFrom,
      priceTo,
      currency: currency || 'USD',
      coverImageUrl,
      isFeatured: isFeatured || false,
      isActive: true
    });

    await listing.save();

    res.status(201).json({
      message: 'Listing created successfully',
      listing
    });
  } catch (error) {
    console.error('Create listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// UPDATE listing (owner or admin)
router.put('/:id', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, description, eventType, priceFrom, priceTo, currency, coverImageUrl, isFeatured, isActive } = req.body;

    const listing = await MarketplaceListing.findById(id);
    if (!listing) {
      res.status(404).json({ message: 'Listing not found' });
      return;
    }

    // Check authorization
    const planner = await Planner.findById(listing.plannerId);
    if (planner?.userId.toString() !== req.user?.userId && req.user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Unauthorized to update this listing' });
      return;
    }

    // Update fields
    if (title) listing.title = title;
    if (description) listing.description = description;
    if (eventType) listing.eventType = eventType;
    if (priceFrom) listing.priceFrom = priceFrom;
    if (priceTo) listing.priceTo = priceTo;
    if (currency) listing.currency = currency;
    if (coverImageUrl) listing.coverImageUrl = coverImageUrl;
    if (isFeatured !== undefined) listing.isFeatured = isFeatured;
    if (isActive !== undefined) listing.isActive = isActive;

    await listing.save();

    res.json({
      message: 'Listing updated successfully',
      listing
    });
  } catch (error) {
    console.error('Update listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE listing (soft delete)
router.delete('/:id', verifyToken, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const listing = await MarketplaceListing.findById(id);
    if (!listing) {
      res.status(404).json({ message: 'Listing not found' });
      return;
    }

    // Check authorization
    const planner = await Planner.findById(listing.plannerId);
    if (planner?.userId.toString() !== req.user?.userId && req.user?.role !== 'ADMIN') {
      res.status(403).json({ message: 'Unauthorized to delete this listing' });
      return;
    }

    // Soft delete
    listing.isActive = false;
    await listing.save();

    res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error('Delete listing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;