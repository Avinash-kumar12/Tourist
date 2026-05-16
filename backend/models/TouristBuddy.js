const mongoose = require('mongoose');

const touristBuddySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  languages: [{
    type: String,
    trim: true
  }],
  pricePerDay: {
    type: Number,
    required: [true, 'Price per day is required'],
    min: 0
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  bio: {
    type: String,
    default: '',
    maxlength: 500
  },
  specialties: [{
    type: String,
    trim: true
  }],
  experience: {
    type: Number,
    default: 0
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('TouristBuddy', touristBuddySchema);
