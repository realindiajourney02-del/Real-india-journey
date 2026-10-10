const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  image: { type: String, default: '/images/car_dzire.jpg' },
  interiorImage: { type: String, default: '/images/car_dzire_interior.jpg' },
  capacity: { type: String, default: '4 Passengers' },
  luggage: { type: String, default: '2 Large Bags' },
  ac: { type: String, default: 'Air Conditioned' },
  transmission: { type: String, default: 'Manual / Automatic' },
  priceDay: { type: String, required: true },
  perKm: { type: String, default: '₹12/km' },
  features: [{ type: String }],
  badge: { type: String, default: 'Popular Choice' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Car', carSchema);
