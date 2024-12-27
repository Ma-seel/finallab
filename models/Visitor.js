const mongoose = require('mongoose');

const visitorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address",
    ],
  },
  visitedAttractions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Attraction',
    },
  ],
});

module.exports = mongoose.model('Visitor', visitorSchema);