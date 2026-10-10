const express = require('express');
const router = express.Router();
const Setting = require('../models/Setting');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

router.get('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.settings);
    }
    let settings = await Setting.findOne();
    if (!settings) {
      settings = await Setting.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      memoryStore.settings = { ...memoryStore.settings, ...req.body };
      return res.json(memoryStore.settings);
    }

    let settings = await Setting.findOne();
    if (!settings) {
      settings = new Setting(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    const updated = await settings.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
