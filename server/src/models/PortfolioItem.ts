import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolioItem extends Document {
  plannerId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  eventType: string;
  location: string;
  eventDate: Date;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
}

const portfolioItemSchema = new Schema<IPortfolioItem>({
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
  location: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  imageUrls: [{
    type: String,
    required: true
  }]
}, {
  timestamps: true
});

export default mongoose.model<IPortfolioItem>('PortfolioItem', portfolioItemSchema);