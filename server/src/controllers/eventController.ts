import { Request, Response } from 'express';
import Event from '../models/Event';
import { validateData, eventSchema } from '../utils/validation';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const createEvent = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const validation = validateData(eventSchema, req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const eventData = {
      ...validation.data,
      customerId: req.user.userId,
      eventDate: new Date(validation.data.eventDate)
    };

    const event = new Event(eventData);
    await event.save();

    res.status(201).json({
      message: 'Event created successfully',
      event
    });
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvents = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { page = 1, limit = 10, status } = req.query;

    const query: any = {};
    if (req.user.role === 'customer') {
      query.customerId = req.user.userId;
    } else if (req.user.role === 'planner') {
      query.plannerId = req.user.userId;
    }

    if (status) query.status = status;

    const events = await Event.find(query)
      .populate('customerId', 'name email')
      .populate('plannerId', 'businessName')
      .sort({ createdAt: -1 })
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number));

    const total = await Event.countDocuments(query);

    res.json({
      events,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get events error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEventById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;

    const event = await Event.findById(id)
      .populate('customerId', 'name email phone')
      .populate('plannerId', 'businessName userId', 'name email phone');

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Check if user has permission to view this event
    if (req.user.role === 'customer' && event.customerId.toString() !== req.user.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    if (req.user.role === 'planner' && event.plannerId?.toString() !== req.user.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    res.json({ event });
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateEventStatus = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { id } = req.params;
    const { status } = req.body;

    const event = await Event.findById(id);

    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    // Only planners and admins can update status
    if (req.user.role !== 'planner' && req.user.role !== 'admin') {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    // Planners can only update their own events
    if (req.user.role === 'planner' && event.plannerId?.toString() !== req.user.userId) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }

    event.status = status;
    await event.save();

    res.json({
      message: 'Event status updated successfully',
      event
    });
  } catch (error) {
    console.error('Update event status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};