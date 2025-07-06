const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  area: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  name: { type: String, required: true },
  contact: { type: String, required: true },
  imageUrl: String,
  location: {
    lat: Number,
    lng: Number
  },
  status: {
    type: String,
    enum: ['Pending', 'Solved'],
    default: 'Pending'
  },
  // This captures both date and time when the issue is created
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Issue', issueSchema);
