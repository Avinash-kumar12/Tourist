const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  destination: {
    type: String,
    required: [true, 'Destination is required'],
    trim: true
  },
  days: {
    type: Number,
    required: [true, 'Number of days is required'],
    min: 1,
    max: 30
  },
  budget: {
    type: String,
    enum: ['budget', 'moderate', 'luxury'],
    default: 'moderate'
  },
  interests: [{
    type: String,
    trim: true
  }],
  itineraryData: {
    type: Object,
    default: null
  },
  title: {
    type: String,
    default: ''
  }
}, { timestamps: true });

module.exports = mongoose.model('Trip', tripSchema);
