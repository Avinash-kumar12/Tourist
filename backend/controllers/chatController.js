const { chatWithAssistant } = require('../services/aiService');

// @desc    Chat with AI travel assistant
// @route   POST /api/chat
const chat = async (req, res, next) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'Messages array is required' });
    }

    const reply = await chatWithAssistant(messages);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
};

module.exports = { chat };
