const mongoose = require('mongoose');

const itineraryItemSchema = new mongoose.Schema({
  day: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String, required: true },
  highlights: [{ type: String }]
});

const faqItemSchema = new mongoose.Schema({
  q: { type: String, required: true },
  a: { type: String, required: true }
});

const packageSchema = new mongoose.Schema({
  slug: { type: String, required: true, unique: true, index: true },
  title: { type: String, required: true, trim: true },
  category: { 
    type: String, 
    required: true, 
    trim: true
  },
  subcategory: {
    type: String,  
    default: '',
    trim: true
  },
  duration: { type: String, required: true },
  daysCount: { type: Number, required: true },
  nightsCount: { type: Number, required: true },
  route: { type: String, required: true },
  price: { type: String, required: true },
  priceVal: { type: Number, required: true },
  image: { type: String, required: true },
  heroImages: [{ type: String }],
  description: { type: String, required: true },
  highlights: [{ type: String }],
  overview: { type: String, required: true },
  accommodations: { type: String },
  transportation: { type: String },
  meals: { type: String },
  itinerary: [itineraryItemSchema],
  inclusions: [{ type: String }],
  faqs: [faqItemSchema],
  isFeatured: { type: Boolean, default: false },

  // SEO Metadata
  seoTitle: { type: String, default: '' },
  seoKeywords: { type: String, default: '' },
  seoDescription: { type: String, default: '' }
}, {
  timestamps: true,
  strict: false
});

module.exports = mongoose.models.Package || mongoose.model('Package', packageSchema);
