const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const Setting = require('../models/Setting');
const Package = require('../models/Package');

const brainDir = `C:\\Users\\Owner\\.gemini\\antigravity-ide\\brain\\959e41ef-9cbe-4a0b-aeac-df11fe6b4eb6`;
const clientPublicDir = path.join(__dirname, '../../client/public/images');

if (!fs.existsSync(clientPublicDir)) {
  fs.mkdirSync(clientPublicDir, { recursive: true });
}

// Find files matching pattern
const files = fs.readdirSync(brainDir);

const tajFile = files.find(f => f.startsWith('hero_taj_mahal_sunrise') && f.endsWith('.jpg'));
const rajFile = files.find(f => f.startsWith('hero_rajasthan_fort_palace') && f.endsWith('.jpg'));
const keralaFile = files.find(f => f.startsWith('hero_kerala_houseboat') && f.endsWith('.jpg'));
const tigerFile = files.find(f => f.startsWith('hero_ranthambore_tiger') && f.endsWith('.jpg'));

console.log('Found generated files:');
console.log({ tajFile, rajFile, keralaFile, tigerFile });

if (tajFile) fs.copyFileSync(path.join(brainDir, tajFile), path.join(clientPublicDir, 'hero_taj_mahal_sunrise.jpg'));
if (rajFile) fs.copyFileSync(path.join(brainDir, rajFile), path.join(clientPublicDir, 'hero_rajasthan_fort_palace.jpg'));
if (keralaFile) fs.copyFileSync(path.join(brainDir, keralaFile), path.join(clientPublicDir, 'hero_kerala_houseboat.jpg'));
if (tigerFile) fs.copyFileSync(path.join(brainDir, tigerFile), path.join(clientPublicDir, 'hero_ranthambore_tiger.jpg'));

console.log('Successfully copied all AI generated hero images to client/public/images/\n');

async function applyToDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    // 1. Update Site Settings (Home Hero Images)
    const settingsUpdate = {
      homeHeroImage1: '/images/hero_taj_mahal_sunrise.jpg',
      homeHeroImage2: '/images/hero_rajasthan_fort_palace.jpg',
      homeHeroImage3: '/images/hero_kerala_houseboat.jpg',
      homeHeroImage4: '/images/hero_ranthambore_tiger.jpg',
      packagesHeroImage: '/images/hero_rajasthan_fort_palace.jpg',
      blogsHeroImage: '/images/hero_taj_mahal_sunrise.jpg',
      categoriesHeroImage: '/images/hero_kerala_houseboat.jpg',
      aboutHeroImage: '/images/hero_rajasthan_fort_palace.jpg',
      contactHeroImage: '/images/hero_taj_mahal_sunrise.jpg'
    };

    await Setting.collection.updateOne({}, { $set: settingsUpdate }, { upsert: true });
    console.log('✓ Updated Site Settings with new AI generated luxury hero slider images!');

    // 2. Update Luxury Collection Package in MongoDB with these master images
    const luxuryPkg = await Package.findOne({ slug: /luxury-collection/i });
    if (luxuryPkg) {
      await Package.collection.updateOne(
        { _id: luxuryPkg._id },
        { 
          $set: { 
            image: '/images/hero_taj_mahal_sunrise.jpg',
            heroImages: [
              '/images/hero_taj_mahal_sunrise.jpg',
              '/images/hero_rajasthan_fort_palace.jpg',
              '/images/hero_kerala_houseboat.jpg',
              '/images/hero_ranthambore_tiger.jpg'
            ]
          } 
        }
      );
      console.log(`✓ Updated Luxury Collection Package "${luxuryPkg.title}" with 4 custom AI generated images!`);
    }

    process.exit(0);
  } catch (err) {
    console.error('Error applying to DB:', err);
    process.exit(1);
  }
}

applyToDatabase();
