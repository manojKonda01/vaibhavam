import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  currency: string;
  isRentable: boolean;
  isPurchasable: boolean;
  imageUrl: string;
  stock?: number;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Decorations', 'Lighting', 'Balloons', 'Audio', 'Cameras', 'Other']
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isRentable: {
    type: Boolean,
    default: false
  },
  isPurchasable: {
    type: Boolean,
    default: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    min: 0
  }
}, {
  timestamps: true
});

export default mongoose.model<IProduct>('Product', productSchema);