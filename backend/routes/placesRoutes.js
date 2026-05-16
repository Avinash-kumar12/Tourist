const express = require('express');
const router = express.Router();
const { getCities, getPlacesByCity } = require('../controllers/placesController');

router.get('/', getCities);
router.get('/:city', getPlacesByCity);

module.exports = router;
