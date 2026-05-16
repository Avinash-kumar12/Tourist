const TouristBuddy = require('../models/TouristBuddy');
const Booking = require('../models/Booking');

// @desc    Get all available buddies (with optional filters)
// @route   GET /api/buddies
const getBuddies = async (req, res, next) => {
  try {
    const { city, language, maxPrice, minRating } = req.query;

    let filter = { isAvailable: true };

    if (city) filter.city = new RegExp(city, 'i');
    if (language) filter.languages = { $in: [new RegExp(language, 'i')] };
    if (maxPrice) filter.pricePerDay = { $lte: Number(maxPrice) };
    if (minRating) filter.rating = { $gte: Number(minRating) };

    const buddies = await TouristBuddy.find(filter)
      .populate('user', 'name email avatar')
      .sort({ rating: -1 });

    res.json(buddies);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single buddy profile
// @route   GET /api/buddies/:id
const getBuddyById = async (req, res, next) => {
  try {
    const buddy = await TouristBuddy.findById(req.params.id)
      .populate('user', 'name email avatar');

    if (!buddy) {
      return res.status(404).json({ message: 'Buddy not found' });
    }

    res.json(buddy);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update guide profile
// @route   POST /api/buddies/profile
const upsertProfile = async (req, res, next) => {
  try {
    const { city, languages, pricePerDay, bio, specialties, experience } = req.body;

    let buddy = await TouristBuddy.findOne({ user: req.user._id });

    if (buddy) {
      // Update existing
      buddy.city = city || buddy.city;
      buddy.languages = languages || buddy.languages;
      buddy.pricePerDay = pricePerDay || buddy.pricePerDay;
      buddy.bio = bio !== undefined ? bio : buddy.bio;
      buddy.specialties = specialties || buddy.specialties;
      buddy.experience = experience !== undefined ? experience : buddy.experience;
      await buddy.save();
    } else {
      // Create new
      buddy = await TouristBuddy.create({
        user: req.user._id,
        city,
        languages,
        pricePerDay,
        bio,
        specialties,
        experience
      });
    }

    res.status(201).json(buddy);
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle buddy availability
// @route   PATCH /api/buddies/availability
const toggleAvailability = async (req, res, next) => {
  try {
    const buddy = await TouristBuddy.findOne({ user: req.user._id });
    if (!buddy) {
      return res.status(404).json({ message: 'Guide profile not found' });
    }

    buddy.isAvailable = !buddy.isAvailable;
    await buddy.save();

    res.json({ isAvailable: buddy.isAvailable });
  } catch (error) {
    next(error);
  }
};

// @desc    Send a booking request to a buddy
// @route   POST /api/buddies/request
const sendRequest = async (req, res, next) => {
  try {
    const { buddyId, startDate, endDate, message } = req.body;

    const buddy = await TouristBuddy.findById(buddyId);
    if (!buddy) {
      return res.status(404).json({ message: 'Buddy not found' });
    }

    if (!buddy.isAvailable) {
      return res.status(400).json({ message: 'This buddy is currently unavailable' });
    }

    // Calculate total cost
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;
    const totalCost = diffDays * buddy.pricePerDay;

    const booking = await Booking.create({
      tourist: req.user._id,
      buddy: buddyId,
      startDate,
      endDate,
      message,
      totalCost
    });

    res.status(201).json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get bookings for a guide (received requests)
// @route   GET /api/buddies/requests
const getMyRequests = async (req, res, next) => {
  try {
    const buddy = await TouristBuddy.findOne({ user: req.user._id });
    if (!buddy) {
      return res.status(404).json({ message: 'Guide profile not found' });
    }

    const bookings = await Booking.find({ buddy: buddy._id })
      .populate('tourist', 'name email avatar')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

// @desc    Update booking status (accept/reject)
// @route   PATCH /api/buddies/requests/:id
const updateRequestStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    next(error);
  }
};

// @desc    Get my bookings as a tourist
// @route   GET /api/buddies/my-bookings
const getMyBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ tourist: req.user._id })
      .populate({
        path: 'buddy',
        populate: { path: 'user', select: 'name email avatar' }
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBuddies,
  getBuddyById,
  upsertProfile,
  toggleAvailability,
  sendRequest,
  getMyRequests,
  updateRequestStatus,
  getMyBookings
};
