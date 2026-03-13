import jwt from 'jsonwebtoken';
import User from '../models/User';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export class AuthService {
  static generateAccessToken(payload: TokenPayload): string {
    const secret = process.env.JWT_ACCESS_SECRET;
    if (!secret) throw new Error('JWT_ACCESS_SECRET not set');
    return (jwt.sign as any)(payload, secret, {
      expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || '15m'
    });
  }

  static generateRefreshToken(payload: TokenPayload): string {
    const secret = process.env.JWT_REFRESH_SECRET;
    if (!secret) throw new Error('JWT_REFRESH_SECRET not set');
    return (jwt.sign as any)(payload, secret, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d'
    });
  }

  static async storeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $push: { refreshTokens: refreshToken }
    });
  }

  static async removeRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      $pull: { refreshTokens: refreshToken }
    });
  }

  static async clearAllRefreshTokens(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      refreshTokens: []
    });
  }

  static async validateRefreshToken(refreshToken: string): Promise<TokenPayload | null> {
    try {
      const secret = process.env.JWT_REFRESH_SECRET;
      if (!secret) throw new Error('JWT_REFRESH_SECRET not set');

      const decoded = (jwt.verify as any)(refreshToken, secret) as TokenPayload;

      // Check if token exists in user's refresh tokens
      const user = await User.findById(decoded.userId);
      if (!user || !user.refreshTokens.includes(refreshToken)) {
        return null;
      }

      return decoded;
    } catch (error) {
      return null;
    }
  }
}