const express = require('express');
const router = express.Router();
const { getSuggestions, getPersonalizedSuggestions } = require('../controllers/suggestionController');

// @desc    Get suggestions based on symptoms
// @route   POST /api/suggestions
router.post('/', getSuggestions);

// @desc    Get personalized suggestions using AI
// @route   POST /api/suggestions/generate
router.post('/generate', getPersonalizedSuggestions);

module.exports = router; 