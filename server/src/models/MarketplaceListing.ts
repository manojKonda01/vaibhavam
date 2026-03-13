import mongoose, { Document, Schema } from 'mongoose';

export interface IMarketplaceListing extends Document {
  plannerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  eventType: string;
  priceFrom: number;
  priceTo: number;
  currency: string;
  isFeatured: boolean;
  isActive: boolean;
  coverImageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const marketplaceListingSchema = new Schema<IMarketplaceListing>({
  plannerId: {
    type: Schema.Types.ObjectId,
    ref: 'Planner',
    required: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  eventType: {
    type: String,
    required: true,
    enum: ['Wedding', 'Corporate', 'Birthday', 'Festival', 'Private Party', 'Luxury Event']
  },
  priceFrom: {
    type: Number,
    required: true,
    min: 0
  },
  priceTo: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'USD'
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  coverImageUrl: {
    type: String
  }
}, {
  timestamps: true
});

export default mongoose.model<IMarketplaceListing>('MarketplaceListing', marketplaceListingSchema);