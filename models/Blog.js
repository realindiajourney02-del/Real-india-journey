const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, trim: true },
  category: { type: String, default: 'Travel Guides' },
  date: { type: String, default: () => new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
  author: { type: String, default: 'Real India Journey Travel Specialist' },
  readTime: { type: String, default: '5 min read' },
  image: { type: String, default: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80' },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  isPublished: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },

  // SEO Metadata
  seoTitle: { type: String, default: '' },
  seoKeywords: { type: String, default: '' },
  seoDescription: { type: String, default: '' }
});

module.exports = mongoose.model('Blog', blogSchema);
