const express = require('express');
const router = express.Router();
const RejectionMessage = require('../models/RejectionMessage');

const languageMap = {
    'english': 'en',
    'french': 'fr',
    'italian': 'it',
    'arabic': 'ar',
    'spanish': 'es'
};

// Get random rejection message
router.get('/random', async (req, res) => {
    try {
        const { language } = req.query;

        let query = {};
        let langCode;
        if (language) {
            langCode = languageMap[language.toLowerCase()];
            if (!langCode) {
                return res.status(400).json({ error: `Unsupported language: ${language}` });
            }
            query = {
                $or: [
                    { [langCode]: { $exists: true, $ne: null } },
                    { language: language.toLowerCase() }
                ]
            };
        }

        const message = await RejectionMessage.aggregate([
            { $match: query },
            { $sample: { size: 1 } }
        ]);

        if (!message || message.length === 0) {
            return res.status(404).json({ 
                error: `No rejection messages found for language: ${language}`,
                collection: RejectionMessage.collection.name
            });
        }

        const result = message[0];
        if (result.language) {
            res.json({
                message: result.message,
                language: result.language
            });
        } else {
            res.json({
                message: result[langCode],
                language: language || 'english'
            });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch random message' });
    }
});

// Get all rejection messages
router.get('/', async (req, res) => {
    try {
        const { language } = req.query;

        let query = {};
        let langCode;
        if (language) {
            langCode = languageMap[language.toLowerCase()];
            if (!langCode) {
                return res.status(400).json({ error: `Unsupported language: ${language}` });
            }
            query = {
                $or: [
                    { [langCode]: { $exists: true, $ne: null } },
                    { language: language.toLowerCase() }
                ]
            };
        }

        const messages = await RejectionMessage.find(query);

        const formattedMessages = messages.map(msg => {
            if (msg.language) {
                return {
                    message: msg.message,
                    language: msg.language
                };
            } else {
                return {
                    message: msg[langCode],
                    language: language || 'english'
                };
            }
        });

        res.json(formattedMessages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages' });
    }
});

// Add new rejection message
router.post('/', async (req, res) => {
    try {
        const { message, language } = req.body;

        if (!message || !language) {
            return res.status(400).json({ error: 'Message and language are required' });
        }

        const langCode = languageMap[language.toLowerCase()];
        if (!langCode) {
            return res.status(400).json({ error: `Unsupported language: ${language}` });
        }

        const newMessage = new RejectionMessage({
            [langCode]: message
        });

        await newMessage.save();

        res.status(201).json({
            message: newMessage[langCode],
            language: language
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add message' });
    }
});

module.exports = router; 