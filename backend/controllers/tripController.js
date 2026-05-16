const Trip = require('../models/Trip');
const { generateItinerary } = require('../services/aiService');

// @desc    Generate AI itinerary and save trip
// @route   POST /api/trips/generate
const generateTrip = async (req, res, next) => {
  try {
    const { destination, days, budget, interests } = req.body;

    if (!destination || !days) {
      return res.status(400).json({ message: 'Destination and days are required' });
    }

    const itineraryData = await generateItinerary(
      destination,
      days,
      budget || 'moderate',
      interests || ['sightseeing']
    );

    const trip = await Trip.create({
      user: req.user._id,
      destination,
      days,
      budget: budget || 'moderate',
      interests: interests || ['sightseeing'],
      itineraryData,
      title: itineraryData.title || `${days}-Day Trip to ${destination}`
    });

    res.status(201).json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Get all trips for logged-in user
// @route   GET /api/trips
const getMyTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    // Ensure user owns the trip
    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to view this trip' });
    }

    res.json(trip);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a trip
// @route   DELETE /api/trips/:id
const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    if (trip.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await trip.deleteOne();
    res.json({ message: 'Trip deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { generateTrip, getMyTrips, getTripById, deleteTrip };
