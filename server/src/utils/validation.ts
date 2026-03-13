import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['customer', 'planner', 'admin']).optional().default('customer'),
  phone: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    country: z.string()
  }).optional()
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
});

export const plannerProfileSchema = z.object({
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  location: z.object({
    city: z.string(),
    state: z.string(),
    country: z.string()
  }),
  services: z.array(z.string()).min(1, 'At least one service is required'),
  experience: z.number().min(0, 'Experience must be a positive number')
});

export const eventSchema = z.object({
  eventType: z.enum(['wedding', 'corporate', 'birthday', 'festival', 'private_party', 'luxury_event']),
  eventDate: z.string().refine((date) => new Date(date) > new Date(), 'Event date must be in the future'),
  location: z.object({
    venue: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string()
  }),
  budget: z.number().min(0, 'Budget must be a positive number'),
  notes: z.string().optional(),
  guestCount: z.number().min(1, 'Guest count must be at least 1').optional()
});

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  category: z.enum(['decorations', 'lighting', 'furniture', 'catering', 'entertainment', 'other']),
  price: z.number().min(0, 'Price must be a positive number'),
  rentPrice: z.number().min(0, 'Rent price must be a positive number').optional(),
  stock: z.number().min(0, 'Stock must be a non-negative number'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  images: z.array(z.string()).optional()
});

export const reviewSchema = z.object({
  plannerId: z.string(),
  rating: z.number().min(1).max(5, 'Rating must be between 1 and 5'),
  comment: z.string().min(10, 'Comment must be at least 10 characters'),
  eventId: z.string().optional()
});

export const messageSchema = z.object({
  receiverId: z.string(),
  message: z.string().min(1, 'Message cannot be empty').max(1000, 'Message too long')
});

export const validateData = <T>(schema: z.ZodSchema<T>, data: any): { success: true; data: T } | { success: false; errors: string[] } => {
  try {
    const result = schema.parse(data);
    return { success: true, data: result };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, errors: error.errors.map((e: z.ZodIssue) => e.message) };
    }
    return { success: false, errors: ['Validation failed'] };
  }
};

export const createPartialSchema = (schema: z.ZodObject<any>) => schema.partial();