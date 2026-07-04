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
  getMyBookings
} = require('../controllers/buddyController');
const { protect, authorize } = require('../middlewares/auth');

// Public routes
router.get('/', getBuddies);
router.get('/profile/:id', getBuddyById);

// Tourist routes
router.post('/request', protect, authorize('tourist'), sendRequest);
router.get('/my-bookings', protect, authorize('tourist'), getMyBookings);

// Guide routes
router.post('/profile', protect, authorize('guide'), upsertProfile);
router.patch('/availability', protect, authorize('guide'), toggleAvailability);
router.get('/requests', protect, authorize('guide'), getMyRequests);
router.patch('/requests/:id', protect, authorize('guide'), updateRequestStatus);

module.exports = router;
