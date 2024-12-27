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

module.exports = router;
