const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package');

dotenv.config({ path: '../.env' });

const FALLBACK_HERO_SETS = {
  'same-day': [
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1585135497273-1a86b09fe707?auto=format&fit=crop&w=1600&q=80'
  ],
  'golden-triangle': [
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80'
  ],
  'rajasthan': [
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1585135497273-1a86b09fe707?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80'
  ],
  'kerala': [
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1609828913642-a9b0c2e36125?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1600&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=80'
  ]
};

async function updateHeroImages() {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error('MONGODB_URI missing in .env');
      process.exit(1);
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const packages = await Package.find({});
    console.log(`Found ${packages.length} packages to process.`);

    for (const pkg of packages) {
      const existingHero = (pkg.heroImages && Array.isArray(pkg.heroImages)) 
        ? pkg.heroImages.filter(img => img && typeof img === 'string' && img.trim() !== '' && img !== '[Uploaded Image File]') 
        : [];

      let newHeroImages = [...existingHero];

      // Ensure primary image is first
      if (pkg.image && !newHeroImages.includes(pkg.image)) {
        newHeroImages.unshift(pkg.image);
      }

      // Fill up to 3-4 images if fewer than 2
      if (newHeroImages.length < 2) {
        const fallbacks = FALLBACK_HERO_SETS[pkg.category] || FALLBACK_HERO_SETS['default'];
        for (const fb of fallbacks) {
          if (!newHeroImages.includes(fb)) {
            newHeroImages.push(fb);
          }
          if (newHeroImages.length >= 3) break;
        }
      }

      // Update directly via MongoDB collection updateOne to bypass Mongoose schema caching issues
      await Package.collection.updateOne(
        { _id: pkg._id },
        { $set: { heroImages: newHeroImages } }
      );

      console.log(`Updated "${pkg.title}" -> ${newHeroImages.length} slider images`);
    }

    console.log('Successfully updated all package hero images!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating hero images:', err);
    process.exit(1);
  }
}

updateHeroImages();
