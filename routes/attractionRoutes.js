const express = require('express');
const Attraction = require('../models/Attraction');
const router = express.Router();

// Add a new attraction
router.post('/', async (req, res) => {
  const { name, location, entryFee } = req.body;

  try {
    // Validate entryFee is non-negative
    if (entryFee < 0) {
      return res.status(400).json({ error: 'Entry fee cannot be negative' });
    }

    // Create a new attraction
    const attraction = await Attraction.create({ name, location, entryFee });
    res.status(201).json(attraction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get top 5 attractions by rating
router.get('/top-rated', async (req, res) => {
  try {
    const topAttractions = await Attraction.find()
      .sort({ rating: -1 })
      .limit(5);
    res.status(200).json(topAttractions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
