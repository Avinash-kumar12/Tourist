const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tourist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buddy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TouristBuddy',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  message: {
    type: String,
    default: '',
    maxlength: 500
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
    default: 'pending'
  },
  totalCost: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Booking', bookingSchema);
