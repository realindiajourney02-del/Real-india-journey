const express = require('express');
const router = express.Router();
const Car = require('../models/Car');
const memoryStore = require('../data/inMemoryStore');

// GET /api/cars - Get all rental cars
router.get('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.cars);
    }
    const cars = await Car.find({}).sort({ createdAt: -1 });
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving rental fleet', error: err.message });
  }
});

// GET /api/cars/:id - Get single car
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;
    if (!global.isMongoConnected) {
      const found = memoryStore.cars.find(c => c._id === key || c.id === key);
      if (!found) return res.status(404).json({ message: 'Car not found' });
      return res.json(found);
    }
    const car = await Car.findById(key);
    if (!car) return res.status(404).json({ message: 'Car not found' });
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving car', error: err.message });
  }
});

// POST /api/cars - Create new car
router.post('/', async (req, res) => {
  try {
    let { name, category, image, interiorImage, capacity, luggage, ac, transmission, priceDay, perKm, features, badge } = req.body;

    if (!name || !category || !priceDay) {
      return res.status(400).json({ message: 'Name, category, and daily price are required' });
    }

    if (typeof features === 'string') {
      features = features.split('\n').map(f => f.trim()).filter(Boolean);
    }

    const carData = {
      name,
      category,
      image: image || '/images/car_dzire.jpg',
      interiorImage: interiorImage || '/images/car_dzire_interior.jpg',
      capacity: capacity || '4 Passengers',
      luggage: luggage || '2 Large Bags',
      ac: ac || 'Air Conditioned',
      transmission: transmission || 'Manual / Automatic',
      priceDay,
      perKm: perKm || '₹12/km',
      features: features || [],
      badge: badge || 'Popular Choice'
    };

    if (!global.isMongoConnected) {
      const newCar = {
        _id: `car-${Date.now()}`,
        id: `car-${Date.now()}`,
        ...carData,
        createdAt: new Date().toISOString()
      };
      memoryStore.cars.unshift(newCar);
      return res.status(201).json({ message: 'Car added to fleet successfully', car: newCar });
    }

    const newCar = new Car(carData);
    const saved = await newCar.save();
    res.status(201).json({ message: 'Car added to fleet successfully', car: saved });
  } catch (err) {
    console.error('Error adding car:', err);
    res.status(500).json({ message: 'Error adding car', error: err.message });
  }
});

// PUT /api/cars/:id - Update car
router.put('/:id', async (req, res) => {
  try {
    let { name, category, image, interiorImage, capacity, luggage, ac, transmission, priceDay, perKm, features, badge } = req.body;

    if (typeof features === 'string') {
      features = features.split('\n').map(f => f.trim()).filter(Boolean);
    }

    const updateData = {
      name,
      category,
      image,
      interiorImage,
      capacity,
      luggage,
      ac,
      transmission,
      priceDay,
      perKm,
      features,
      badge
    };

    if (!global.isMongoConnected) {
      const idx = memoryStore.cars.findIndex(c => c._id === req.params.id || c.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Car not found' });

      memoryStore.cars[idx] = { ...memoryStore.cars[idx], ...updateData };
      return res.json({ message: 'Car updated successfully', car: memoryStore.cars[idx] });
    }

    const updated = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car updated successfully', car: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating car', error: err.message });
  }
});

// DELETE /api/cars/:id - Delete car
router.delete('/:id', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.cars.findIndex(c => c._id === req.params.id || c.id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Car not found' });
      memoryStore.cars.splice(idx, 1);
      return res.json({ message: 'Car removed from fleet successfully' });
    }

    const deleted = await Car.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Car not found' });
    res.json({ message: 'Car removed from fleet successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting car', error: err.message });
  }
});

module.exports = router;
