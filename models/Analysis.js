// models/Analysis.js

const mongoose = require('mongoose');

// Define the schema for an accessibility analysis
const analysisSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  violations: {
    type: Array,
    required: true
  }
});

// Export the model so it can be used in your routes
module.exports = mongoose.model('Analysis', analysisSchema);
