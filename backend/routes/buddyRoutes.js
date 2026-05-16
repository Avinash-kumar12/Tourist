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
router.post('/request', protect, sendRequest);
router.get('/my-bookings', protect, getMyBookings);

// Guide routes
router.post('/profile', protect, upsertProfile);
router.patch('/availability', protect, toggleAvailability);
router.get('/requests', protect, getMyRequests);
router.patch('/requests/:id', protect, updateRequestStatus);

module.exports = router;
