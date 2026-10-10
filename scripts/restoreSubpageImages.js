const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const Setting = require('../models/Setting');

async function restoreImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    await Setting.collection.updateOne(
      {},
      {
        $set: {
          aboutHeroImage: '/images/about_hero.jpg',
          blogsHeroImage: '/images/blogs_hero.jpg',
          contactHeroImage: '/images/contact_hero.jpg',
          packagesHeroImage: '/images/packages_hero.jpg',
          categoriesHeroImage: '/images/blogs_hero.jpg'
        }
      },
      { upsert: true }
    );

    console.log('✓ Restored original subpage hero images for About Us, Travel Experience, Blogs, and Contact Us in MongoDB!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating DB:', err);
    process.exit(1);
  }
}

restoreImages();
