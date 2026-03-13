import mongoose, { Document, Schema } from 'mongoose';

export interface IPlanner extends Document {
  userId: mongoose.Types.ObjectId;
  displayName: string;
  bio: string;
  location: string;
  rating: number;
  experienceYears: number;
  specialties: string[];
  profileImageUrl?: string;
  coverImageUrl?: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const plannerSchema = new Schema<IPlanner>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  displayName: {
    type: String,
    required: true,
    trim: true
  },
  bio: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  experienceYears: {
    type: Number,
    required: true,
    min: 0
  },
  specialties: [{
    type: String,
    trim: true
  }],
  profileImageUrl: {
    type: String
  },
  coverImageUrl: {
    type: String
  },
  isApproved: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model<IPlanner>('Planner', plannerSchema);