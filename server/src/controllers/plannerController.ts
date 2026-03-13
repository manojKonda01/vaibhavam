import { Request, Response } from 'express';
import Planner from '../models/Planner';
import User from '../models/User';
import Review from '../models/Review';
import { validateData, plannerProfileSchema } from '../utils/validation';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const getPlanners = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, location, specialty, featured } = req.query;

    const query: any = { isApproved: true };

    if (location) query.location = new RegExp(location as string, 'i');
    if (specialty) query.specialties = new RegExp(specialty as string, 'i');

    const planners = await Planner.find(query)
      .populate('userId', 'name email phone')
      .select('-__v')
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number))
      .sort({ rating: -1 });

    const total = await Planner.countDocuments(query);

    res.json({
      planners,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get planners error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPlannerById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const planner = await Planner.findById(id)
      .populate('userId', 'name email phone')
      .select('-__v');

    if (!planner) {
      res.status(404).json({ message: 'Planner not found' });
      return;
    }

    // Get reviews
    const reviews = await Review.find({ plannerId: planner.userId })
      .populate('userId', 'name')
      .select('rating comment createdAt')
      .sort({ createdAt: -1 })
      .limit(10);

    const averageRating = reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

    res.json({
      planner,
      reviews,
      averageRating,
      reviewCount: reviews.length
    });
  } catch (error) {
    console.error('Get planner by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createOrUpdateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'PLANNER') {
      res.status(403).json({ message: 'Only planners can create profiles' });
      return;
    }

    const validation = validateData(plannerProfileSchema, req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const { displayName, bio, location, specialties, experienceYears, profileImageUrl, coverImageUrl } = validation.data as any;

    let planner = await Planner.findOne({ userId: req.user.userId });

    if (planner) {
      // Update existing profile
      planner.displayName = displayName;
      planner.bio = bio;
      planner.location = location;
      planner.specialties = specialties;
      planner.experienceYears = experienceYears;
      if (profileImageUrl) planner.profileImageUrl = profileImageUrl;
      if (coverImageUrl) planner.coverImageUrl = coverImageUrl;
      await planner.save();
    } else {
      // Create new profile
      planner = new Planner({
        userId: req.user.userId,
        displayName,
        bio,
        location,
        specialties,
        experienceYears,
        profileImageUrl,
        coverImageUrl
      });
      await planner.save();
    }

    res.json({
      message: 'Profile updated successfully',
      planner
    });
  } catch (error) {
    console.error('Create/update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const uploadPortfolio = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== 'PLANNER') {
      res.status(403).json({ message: 'Only planners can upload portfolio' });
      return;
    }

    const { images } = req.body;

    if (!images || !Array.isArray(images)) {
      res.status(400).json({ message: 'Images array is required' });
      return;
    }

    const planner = await Planner.findOne({ userId: req.user.userId });
    if (!planner) {
      res.status(404).json({ message: 'Planner profile not found' });
      return;
    }

    planner.portfolioImages = [...(planner.portfolioImages || []), ...images];
    await planner.save();

    res.json({
      message: 'Portfolio updated successfully',
      portfolioImages: planner.portfolioImages
    });
  } catch (error) {
    console.error('Upload portfolio error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};