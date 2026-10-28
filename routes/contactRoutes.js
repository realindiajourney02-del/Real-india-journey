const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');
const { sendWhatsAppContactNotification } = require('../utils/whatsappService');
const { sendEmailContactNotification } = require('../utils/emailService');

router.post('/', async (req, res) => {
  try {
    const fullName = typeof req.body.fullName === 'string' ? req.body.fullName.trim() : '';
    const email = typeof req.body.email === 'string' ? req.body.email.trim() : '';
    const phone = typeof req.body.phone === 'string' && req.body.phone.trim() ? req.body.phone.trim() : 'Not provided';
    const message = typeof req.body.message === 'string' ? req.body.message.trim() : '';
    const subject = typeof req.body.subject === 'string' && req.body.subject.trim() ? req.body.subject.trim() : 'General Inquiry';

    if (!fullName || !email || !message) {
      return res.status(400).json({ message: 'Name, email, and message are required.' });
    }

    const contactPayload = {
      fullName,
      email,
      phone,
      subject,
      message
    };

    let savedContact;

    if (!global.isMongoConnected) {
      savedContact = {
        _id: `cnt-${Date.now()}`,
        ...contactPayload,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      memoryStore.contacts.unshift(savedContact);
    } else {
      const contact = new Contact(contactPayload);
      savedContact = await contact.save();
    }

    // Trigger WhatsApp Notification in background
    sendWhatsAppContactNotification(savedContact).catch(err => console.error('WhatsApp Error:', err.message));

    // Await Email Notification so the connection does not close before email completes
    try {
      await sendEmailContactNotification(savedContact);
    } catch (emailErr) {
      console.error(`[Contact Email Delivery Failed]:`, emailErr.message);
    }

    return res.status(201).json({
      success: true,
      message: 'Message sent successfully! We will get back to you shortly.',
      data: savedContact
    });
  } catch (error) {
    console.error('Contact Form Submission Error:', error);
    res.status(400).json({ message: error.message });
  }
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.contacts);
    }
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const cnt = memoryStore.contacts.find(c => c._id === req.params.id);
      if (!cnt) return res.status(404).json({ message: 'Message not found' });
      cnt.status = req.body.status;
      return res.json(cnt);
    }

    const updated = await Contact.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Message not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.contacts.findIndex(c => c._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Message not found' });
      memoryStore.contacts.splice(idx, 1);
      return res.json({ message: 'Message deleted' });
    }

    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
