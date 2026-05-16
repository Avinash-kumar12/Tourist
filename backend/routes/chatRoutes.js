const express = require('express');
const router = express.Router();
const { chat } = require('../controllers/chatController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, chat);

module.exports = router;
