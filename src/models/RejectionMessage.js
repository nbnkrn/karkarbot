const mongoose = require('mongoose');

const rejectionMessageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true,
    enum: ['english', 'spanish', 'italian', 'french', 'arabic']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('RejectionMessage', rejectionMessageSchema); 