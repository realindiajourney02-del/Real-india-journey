const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

// Configure Cloudinary from environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || ''
});

// @route   POST /api/upload
// @desc    Upload local image file to Cloudinary
// @access  Public / Admin
router.post('/', async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({ message: 'No image data provided for upload' });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'xzzi3f4s';
    const apiKey = process.env.CLOUDINARY_API_KEY || '657348918999788';
    const apiSecret = process.env.CLOUDINARY_API_SECRET || 'aYEHuue_Dgteo0PSV-m7zA-440A';

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret
    });

    if (cloudName && apiKey && apiSecret) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'real_india_journey',
        resource_type: 'auto'
      });

      return res.json({
        url: result.secure_url,
        public_id: result.public_id,
        message: 'Successfully uploaded image to Cloudinary!'
      });
    }

    // Fallback if Cloudinary credentials are not yet set in .env
    return res.json({
      url: image,
      warning: 'Cloudinary credentials missing in server/.env. Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET to enable automatic Cloudinary cloud uploads.',
      message: 'Local image processed (Add Cloudinary credentials in .env to link directly to Cloudinary URL).'
    });

  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    res.status(500).json({ message: error.message || 'Failed to upload image to Cloudinary' });
  }
});

module.exports = router;
