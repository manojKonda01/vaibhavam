import mongoose, { Document, Schema } from 'mongoose';

export interface IEvent extends Document {
  customerId: mongoose.Types.ObjectId;
  plannerId?: mongoose.Types.ObjectId;
  eventType: string;
  eventDate: Date;
  location: {
    venue: string;
    city: string;
    state: string;
    country: string;
  };
  budget: number;
  status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
  guestCount?: number;
  createdAt: Date;
  updatedAt: Date;
}

const eventSchema = new Schema<IEvent>({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plannerId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  eventType: {
    type: String,
    required: true,
    enum: ['wedding', 'corporate', 'birthday', 'festival', 'private_party', 'luxury_event']
  },
  eventDate: {
    type: Date,
    required: true
  },
  location: {
    venue: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    }
  },
  budget: {
    type: Number,
    required: true,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'in_progress', 'completed', 'cancelled'],
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  guestCount: {
    type: Number,
    min: 1
  }
}, {
  timestamps: true
});

export default mongoose.model<IEvent>('Event', eventSchema);