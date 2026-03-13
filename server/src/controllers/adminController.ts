import { Request, Response } from 'express';
import User from '../models/User';
import Planner from '../models/Planner';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const getUsers = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, role } = req.query;

    const query: any = {};
    if (role) query.role = role;

    const users = await User.find(query)
      .select('-password -refreshTokens -__v')
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number))
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPlanners = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 10, approved } = req.query;

    const query: any = {};
    if (approved !== undefined) query.isApproved = approved === 'true';

    const planners = await Planner.find(query)
      .populate('userId', 'name email phone')
      .select('-__v')
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number))
      .sort({ createdAt: -1 });

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

export const approvePlanner = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const planner = await Planner.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true }
    ).populate('userId', 'name email');

    if (!planner) {
      res.status(404).json({ message: 'Planner not found' });
      return;
    }

    res.json({
      message: 'Planner approved successfully',
      planner
    });
  } catch (error) {
    console.error('Approve planner error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPlanners = await Planner.countDocuments({ isApproved: true });
    const pendingPlanners = await Planner.countDocuments({ isApproved: false });
    const totalEvents = await Planner.aggregate([
      { $group: { _id: null, total: { $sum: '$completedEvents' } } }
    ]);

    res.json({
      totalUsers,
      totalPlanners,
      pendingPlanners,
      totalEvents: totalEvents[0]?.total || 0
    });
  } catch (error) {
    console.error('Dashboard stats error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};