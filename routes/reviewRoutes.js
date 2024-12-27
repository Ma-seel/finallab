const express = require('express');
const Review = require('../models/Review');
const Visitor = require('../models/Visitor');
const Attraction = require('../models/Attraction');
const router = express.Router();

// Post a new review
router.post('/', async (req, res) => {
  const { attraction, visitor, score, comment } = req.body;

  try {
    // Check if visitor exists
    const visitorData = await Visitor.findById(visitor);
    if (!visitorData) {
      return res.status(404).json({ error: 'Visitor not found' });
    }

    // Check if visitor has visited the attraction
    if (!visitorData.visitedAttractions.includes(attraction)) {
      return res.status(400).json({ error: 'Visitor has not visited this attraction' });
    }

    // Check if visitor has already reviewed the attraction
    const existingReview = await Review.findOne({ attraction, visitor });
    if (existingReview) {
      return res.status(400).json({ error: 'Visitor has already reviewed this attraction' });
    }

    // Create the review
    const review = await Review.create({ attraction, visitor, score, comment });

    // Calculate the new average rating for the attraction
    const reviews = await Review.find({ attraction });
    const averageRating = reviews.reduce((total, review) => total + review.score, 0) / reviews.length;

    // Update the attraction's rating
    await Attraction.findByIdAndUpdate(attraction, { rating: averageRating });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all reviews for a specific attraction
router.get('/attraction/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Get all reviews for the given attraction
    const reviews = await Review.find({ attraction: id }).populate('visitor', 'name email');
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this attraction' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews by a specific visitor
router.get('/visitor/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Get all reviews by the given visitor
    const reviews = await Review.find({ visitor: id }).populate('attraction', 'name location');
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ error: 'No reviews found for this visitor' });
    }

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().populate('visitor', 'name email').populate('attraction', 'name location');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
