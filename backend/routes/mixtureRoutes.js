const express = require('express');
const router = express.Router();
const Mixture = require('../models/Mixture');

// @desc    Get all mixtures
// @route   GET /api/mixtures
router.get('/', async (req, res) => {
  try {
    const mixtures = await Mixture.find({});
    res.json(mixtures);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single mixture by ID
// @route   GET /api/mixtures/:id
router.get('/:id', async (req, res) => {
  try {
    const mixture = await Mixture.findById(req.params.id);
    if (mixture) {
      res.json(mixture);
    } else {
      res.status(404).json({ message: 'Mixture not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 