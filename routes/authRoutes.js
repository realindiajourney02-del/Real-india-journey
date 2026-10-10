const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'safare_luxury_jwt_secret_key_2026_spec', {
    expiresIn: '30d'
  });
};

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!global.isMongoConnected) {
      if (email === memoryStore.adminUser.email && bcrypt.compareSync(password, memoryStore.adminUser.passwordHash)) {
        return res.json({
          _id: memoryStore.adminUser._id,
          name: memoryStore.adminUser.name,
          email: memoryStore.adminUser.email,
          role: memoryStore.adminUser.role,
          token: generateToken(memoryStore.adminUser._id)
        });
      } else {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
    }

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/auth/me
router.get('/me', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.adminUser);
    }
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/auth/credentials
router.put('/credentials', protectAdmin, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Both Email and Password are required' });
    }

    if (!global.isMongoConnected) {
      memoryStore.adminUser.email = email.trim().toLowerCase();
      memoryStore.adminUser.passwordHash = bcrypt.hashSync(password, 10);
      return res.json({
        message: 'Admin ID & Password updated successfully',
        email: memoryStore.adminUser.email
      });
    }

    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'Admin user record not found' });
    }

    user.email = email.trim().toLowerCase();
    user.password = password;
    await user.save();

    res.json({
      message: 'Admin ID & Password updated successfully',
      email: user.email
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
