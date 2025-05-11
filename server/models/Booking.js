import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['car', 'motorcycle', 'truck', 'other'],
    required: true
  },
  vehicleNumber: {
    type: String,
    required: true
  },
  parkingSpot: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['upcoming', 'active', 'completed', 'cancelled'],
    default: 'upcoming'
  },
  amount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Booking', bookingSchema);