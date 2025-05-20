const express = require('express');
const router = express.Router();
const Herb = require('../models/Herb');

// @desc    Get all herbs
// @route   GET /api/herbs
router.get('/', async (req, res) => {
  try {
    const herbs = await Herb.find({});
    res.json(herbs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @desc    Get single herb by ID
// @route   GET /api/herbs/:id
router.get('/:id', async (req, res) => {
  try {
    const herb = await Herb.findById(req.params.id);
    if (herb) {
      res.json(herb);
    } else {
      res.status(404).json({ message: 'Herb not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 