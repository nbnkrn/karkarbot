const express = require('express');
const router = express.Router();
const RejectionMessage = require('../models/RejectionMessage');

// Get a random rejection message
router.get('/random', async (req, res) => {
  try {
    const { language } = req.query;
    
    let query = {};
    if (language && ['english', 'spanish', 'italian', 'french', 'arabic'].includes(language)) {
      query.language = language;
    }

    // Get total count of messages
    const count = await RejectionMessage.countDocuments(query);
    
    if (count === 0) {
      return res.status(404).json({ 
        error: 'No rejection messages found' + (language ? ` for language: ${language}` : '')
      });
    }

    // Get random message using aggregation
    const message = await RejectionMessage.aggregate([
      { $match: query },
      { $sample: { size: 1 } }
    ]);

    if (!message || message.length === 0) {
      return res.status(404).json({ 
        error: 'No rejection messages found' + (language ? ` for language: ${language}` : '')
      });
    }

    res.json(message[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rejection message' });
  }
});

// Add a new rejection message
router.post('/', async (req, res) => {
  try {
    const { message, language } = req.body;

    if (!message || !language) {
      return res.status(400).json({ error: 'Message and language are required' });
    }

    if (!['english', 'spanish', 'italian', 'french', 'arabic'].includes(language)) {
      return res.status(400).json({ error: 'Invalid language' });
    }

    const newMessage = new RejectionMessage({ message, language });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Error creating rejection message' });
  }
});

// Get all rejection messages
router.get('/', async (req, res) => {
  try {
    const { language } = req.query;
    let query = {};
    
    if (language && ['english', 'spanish', 'italian', 'french', 'arabic'].includes(language)) {
      query.language = language;
    }

    const messages = await RejectionMessage.find(query);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rejection messages' });
  }
});

module.exports = router; 