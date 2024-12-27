const mongoose = require('mongoose');

const attractionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  entryFee: {
    type: Number,
    required: true,
    min: [0, "Entry fee must be greater than 0"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, "Rating must be at least 0"],
    max: [5, "Rating cannot exceed 5"],
  },
});

module.exports = mongoose.model('Attraction', attractionSchema);
