const express = require('express');
const Visitor = require('../models/Visitor');
const Review = require('../models/Review');
const router = express.Router();

// Add a new visitor
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  try {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Check email uniqueness
    const existingVisitor = await Visitor.findOne({ email });
    if (existingVisitor) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Create new visitor
    const visitor = await Visitor.create({ name, email });
    res.status(201).json(visitor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all visitors
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find();  // Retrieve all visitors from the database
    res.status(200).json(visitors);  // Return the list of visitors
  } catch (error) {
    res.status(500).json({ error: error.message });  // Handle any errors
  }
});

// Get visitor activity (review count)
router.get('/activity', async (req, res) => {
  try {
    const visitors = await Visitor.find();
    const visitorActivity = await Promise.all(
      visitors.map(async (visitor) => {
        const reviewsCount = await Review.countDocuments({ visitor: visitor._id });
        return {
          visitor: visitor.name,
          email: visitor.email,
          reviewsCount,
        };
      })
    );

    res.status(200).json(visitorActivity);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
