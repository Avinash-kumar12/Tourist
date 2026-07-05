const express = require('express');
const router = express.Router();
const {
  getBuddies,
  getBuddyById,
  upsertProfile,
  toggleAvailability,
  sendRequest,
  getMyRequests,
  updateRequestStatus,
  getMyBookings,
  getMyProfile
} = require('../controllers/buddyController');
const { protect, authorize } = require('../middlewares/auth');

// Guide routes (must be defined before /profile/:id to avoid clash)
router.get('/profile/me', protect, authorize('guide'), getMyProfile);

// Public routes
router.get('/', getBuddies);
router.get('/profile/:id', getBuddyById);

// Tourist routes
router.post('/request', protect, authorize('tourist'), sendRequest);
router.get('/my-bookings', protect, authorize('tourist'), getMyBookings);

// Other Guide routes
router.post('/profile', protect, authorize('guide'), upsertProfile);
router.patch('/availability', protect, authorize('guide'), toggleAvailability);
router.get('/requests', protect, authorize('guide'), getMyRequests);
router.patch('/requests/:id', protect, authorize('guide'), updateRequestStatus);

module.exports = router;
