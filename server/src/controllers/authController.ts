import { Request, Response } from 'express';
import User from '../models/User';
import { AuthService, TokenPayload } from '../services/authService';
import { validateData, registerSchema, loginSchema } from '../utils/validation';

interface AuthRequest extends Request {
  user?: TokenPayload;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateData(registerSchema, req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const { name, email, password, role, phone, address } = validation.data as any;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Create user
    const user = new User({
      name,
      email,
      password,
      role: role || 'USER',
      phone,
      address
    });

    await user.save();

    // Generate tokens
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const accessToken = AuthService.generateAccessToken(payload);
    const refreshToken = AuthService.generateRefreshToken(payload);

    // Store refresh token
    await AuthService.storeRefreshToken(user._id.toString(), refreshToken);

    res.status(201).json({
      message: 'User registered successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = validateData(loginSchema, req.body);
    if (!validation.success) {
      res.status(400).json({ message: 'Validation failed', errors: validation.errors });
      return;
    }

    const { email, password } = validation.data as any;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Generate tokens
    const payload: TokenPayload = {
      userId: user._id.toString(),
      email: user.email,
      role: user.role
    };

    const accessToken = AuthService.generateAccessToken(payload);
    const refreshToken = AuthService.generateRefreshToken(payload);

    // Store refresh token
    await AuthService.storeRefreshToken(user._id.toString(), refreshToken);

    res.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      },
      accessToken,
      refreshToken
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const refreshToken = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token required' });
      return;
    }

    const payload = await AuthService.validateRefreshToken(refreshToken);
    if (!payload) {
      res.status(401).json({ message: 'Invalid refresh token' });
      return;
    }

    // Generate new access token
    const newAccessToken = AuthService.generateAccessToken(payload);

    res.json({
      accessToken: newAccessToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (req.user && refreshToken) {
      await AuthService.removeRefreshToken(req.user.userId, refreshToken);
    }

    res.json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: 'Not authenticated' });
      return;
    }

    const user = await User.findById(req.user.userId).select('-password -refreshTokens');
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};