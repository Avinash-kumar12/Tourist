const mongoose = require('mongoose');

const travelKnowledgeSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    default: 'general'
  },
  title: {
    type: String,
    required: true
  },
  itinerary: [{
    type: String
  }],
  responseMarkdown: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('TravelKnowledge', travelKnowledgeSchema);
