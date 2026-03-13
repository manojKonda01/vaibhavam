import { Request, Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';

interface AuthRequest extends Request {
  user?: { userId: string; email: string; role: string };
}

export const createOrder = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ userId: req.user.userId }).populate('items.productId');

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    let totalPrice = 0;
    const orderItems = [];

    for (const item of cart.items) {
      const product = item.productId as any;
      const price = item.isRental ? product.rentPrice || product.price : product.price;
      const itemTotal = price * item.quantity;

      totalPrice += itemTotal;

      orderItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: price,
        isRental: item.isRental,
        rentalDuration: item.rentalDuration
      });
    }

    const order = new Order({
      userId: req.user.userId,
      items: orderItems,
      totalPrice,
      shippingAddress
    });

    await order.save();

    // Clear the cart
    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrders = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const { page = 1, limit = 10, status } = req.query;

    const query: any = { userId: req.user.userId };

    if (status) query.orderStatus = status;

    const orders = await Order.find(query)
      .populate('items.productId', 'name images')
      .select('-__v')
      .limit(limit as number * 1)
      .skip((page as number - 1) * (limit as number))
      .sort({ createdAt: -1 });

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / (limit as number)),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};