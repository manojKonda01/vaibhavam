import { Request, Response } from 'express';
import Product from '../models/Product';
import { validateData, productSchema, createPartialSchema } from '../utils/validation';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { page = 1, limit = 12, category, search } = req.query;

    const query: any = { isAvailable: true };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { name: new RegExp(search as string, 'i') },
        { description: new RegExp(search as string, 'i') }
      ];
    }

    const products = await Product.find(query)
      .select('-__v')
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number))
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      products,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const validation = validateData(productSchema, req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const product = new Product(validation.data);
    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const validation = validateData(createPartialSchema(productSchema), req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const product = await Product.findByIdAndUpdate(id, validation.data, { new: true });

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({
      message: 'Product updated successfully',
      product
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteProduct = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};