const mongoose = require('mongoose');
require('dotenv').config();

const updateMiniCoach = async () => {
  try {
    const URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safare_journeys';
    await mongoose.connect(URI);
    console.log('Connected to MongoDB...');
    const db = mongoose.connection.db;
    const carsCol = db.collection('cars');

    const result = await carsCol.updateMany(
      { $or: [{ name: /mini coach/i }, { id: /mini-coach/i }] },
      { $set: { image: '/images/car_minicoach.jpg' } }
    );
    console.log(`Updated ${result.modifiedCount} car documents in DB.`);
    await mongoose.disconnect();
  } catch (err) {
    console.error('Error updating DB:', err);
  }
};

updateMiniCoach();
