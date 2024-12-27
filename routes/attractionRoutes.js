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

// Get all attractions
router.get('/', async (req, res) => {
  try {
    const attractions = await Attraction.find();  // Retrieve all attractions from the database
    res.status(200).json(attractions);  // Return the list of attractions
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
});

// Get top 5 attractions by rating
router.get('/top-rated', async (req, res) => {
  try {
    const topAttractions = await Attraction.find()
      .sort({ rating: -1 })  // Sort by rating in descending order
      .limit(5);  // Limit to top 5 attractions
    res.status(200).json(topAttractions);  // Return the top 5 attractions
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
});

module.exports = router;
