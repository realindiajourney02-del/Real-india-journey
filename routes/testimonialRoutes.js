const express = require('express');
const router = express.Router();
const Testimonial = require('../models/Testimonial');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const approved = memoryStore.testimonials.filter(t => t.status === 'approved');
      return res.json(approved);
    }
    const testimonials = await Testimonial.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const newTest = {
        _id: `test-${Date.now()}`,
        ...req.body,
        status: req.body.status || 'approved',
        createdAt: new Date().toISOString()
      };
      memoryStore.testimonials.unshift(newTest);
      return res.status(201).json({
        success: true,
        message: 'Thank you for your review! It has been posted.',
        data: newTest
      });
    }

    const testimonial = new Testimonial(req.body);
    const saved = await testimonial.save();
    res.status(201).json({
      success: true,
      message: 'Thank you for your review!',
      data: saved
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/admin', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.testimonials);
    }
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id/status', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const test = memoryStore.testimonials.find(t => t._id === req.params.id);
      if (!test) return res.status(404).json({ message: 'Testimonial not found' });
      test.status = req.body.status;
      return res.json(test);
    }

    const updated = await Testimonial.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Testimonial not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.testimonials.findIndex(t => t._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Testimonial not found' });
      memoryStore.testimonials.splice(idx, 1);
      return res.json({ message: 'Testimonial deleted' });
    }

    const deleted = await Testimonial.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Testimonial not found' });
    res.json({ message: 'Testimonial deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
