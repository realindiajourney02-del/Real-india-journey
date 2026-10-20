const mongoose = require('mongoose');

const itineraryItemSchema = new mongoose.Schema({
  day: { type: String, default: '01' },
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  highlights: [{ type: String }]
}, { _id: false });

const faqItemSchema = new mongoose.Schema({
  q: { type: String, default: '' },
  a: { type: String, default: '' }
}, { _id: false });

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
  duration: { type: String, default: '1 Day' },
  daysCount: { type: Number, default: 1 },
  nightsCount: { type: Number, default: 0 },
  route: { type: String, default: '' },
  price: { type: String, default: 'On Request' },
  priceVal: { type: Number, default: 0 },
  image: { type: String, default: 'https://images.unsplash.com/photo-1599661046289-e31897846e41' },
  heroImages: [{ type: String }],
  description: { type: String, default: '' },
  highlights: [{ type: String }],
  overview: { type: String, default: '' },
  accommodations: { type: String, default: '' },
  transportation: { type: String, default: '' },
  meals: { type: String, default: '' },
  itinerary: [itineraryItemSchema],
  inclusions: [{ type: String }],
  exclusions: [{ type: String }],
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

