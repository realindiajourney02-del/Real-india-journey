const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');
const { sendWhatsAppBookingNotification } = require('../utils/whatsappService');
const { sendEmailBookingNotification } = require('../utils/emailService');

router.post('/', async (req, res) => {
  const submittedData = req.body && typeof req.body === 'object' ? req.body : {};
  const fullName = typeof submittedData.fullName === 'string' ? submittedData.fullName.trim() : '';
  const email = typeof submittedData.email === 'string' ? submittedData.email.trim() : '';
  const phone = typeof submittedData.phone === 'string' ? submittedData.phone.trim() : '';

  if (!fullName || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'A name, valid email address, and phone number are required.' });
  }

  const enquiryData = { ...submittedData, fullName, email, phone };
  let enquiry;

  try {
    if (!global.isMongoConnected) {
      enquiry = {
        _id: `enq-${Date.now()}`,
        ...enquiryData,
        status: 'new',
        createdAt: new Date().toISOString()
      };
      memoryStore.enquiries.unshift(enquiry);
    } else {
      enquiry = await new Enquiry(enquiryData).save();
    }
  } catch (error) {
    const statusCode = error.name === 'ValidationError' ? 400 : 500;
    return res.status(statusCode).json({ message: error.message });
  }

  sendWhatsAppBookingNotification(enquiry).catch(err => console.error('WhatsApp Error:', err.message));

  try {
    await sendEmailBookingNotification(enquiry);
  } catch (error) {
    console.error(`[Enquiry Email Delivery Failed] Enquiry ${enquiry._id}:`, error.message);
  }

  return res.status(201).json({
    success: true,
    message: 'Enquiry submitted successfully! Our travel specialist team will contact you within 2 hours.',
    data: enquiry
  });
});

router.get('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.enquiries);
    }
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.json(enquiries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const enq = memoryStore.enquiries.find(e => e._id === req.params.id);
      if (!enq) return res.status(404).json({ message: 'Enquiry not found' });
      enq.status = req.body.status;
      return res.json(enq);
    }

    const updated = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Enquiry not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.enquiries.findIndex(e => e._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Enquiry not found' });
      memoryStore.enquiries.splice(idx, 1);
      return res.json({ message: 'Enquiry deleted' });
    }

    const deleted = await Enquiry.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Enquiry not found' });
    res.json({ message: 'Enquiry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
