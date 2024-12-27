const express = require('express');
const mongoose = require('mongoose');
const attractionRoutes = require('./routes/attractionRoutes');
const visitorRoutes = require('./routes/visitorRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/attractions', attractionRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/reviews', reviewRoutes);

// Database connection
mongoose.connect('mongodb://localhost/tourism', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(err));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});