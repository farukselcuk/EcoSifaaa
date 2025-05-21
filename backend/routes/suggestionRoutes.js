const express = require('express');
const router = express.Router();
const { getSuggestions } = require('../controllers/suggestionController');

// @desc    Get suggestions based on symptoms
// @route   POST /api/suggestions
router.post('/', getSuggestions);

module.exports = router; 