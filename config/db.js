const mongoose = require('mongoose');

global.isMongoConnected = false;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/safare_journeys', {
      serverSelectionTimeoutMS: 10000
    });
    global.isMongoConnected = true;
    console.log(`[MongoDB Connected]: ${conn.connection.host}`);
  } catch (error) {
    global.isMongoConnected = false;
    console.warn(`[MongoDB Warning]: Could not connect to MongoDB (${error.message}). Operating in High-Performance In-Memory Data Mode.`);
  }
};

module.exports = connectDB;
