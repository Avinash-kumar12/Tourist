const express = require('express');
const router = express.Router();
const { generateTrip, getMyTrips, getTripById, deleteTrip } = require('../controllers/tripController');
const { protect } = require('../middlewares/auth');

router.post('/generate', protect, generateTrip);
router.get('/', protect, getMyTrips);
router.get('/:id', protect, getTripById);
router.delete('/:id', protect, deleteTrip);

module.exports = router;
