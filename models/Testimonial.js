const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  clientName: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  tourName: { type: String, required: true },
  rating: { type: Number, default: 5, min: 1, max: 5 },
  reviewText: { type: String, required: true },
  clientAvatar: { type: String },
  tourDate: { type: String },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'approved' 
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);
