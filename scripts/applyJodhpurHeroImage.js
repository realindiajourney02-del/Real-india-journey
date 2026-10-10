const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });
const Setting = require('../models/Setting');

const brainDir = `C:\\Users\\Owner\\.gemini\\antigravity-ide\\brain\\959e41ef-9cbe-4a0b-aeac-df11fe6b4eb6`;
const clientPublicDir = path.join(__dirname, '../../client/public/images');

const files = fs.readdirSync(brainDir);
const jodhpurFile = files.find(f => f.startsWith('hero_jodhpur_blue_city') && f.endsWith('.jpg'));

console.log('Found Jodhpur image file:', jodhpurFile);

if (jodhpurFile) {
  fs.copyFileSync(path.join(brainDir, jodhpurFile), path.join(clientPublicDir, 'hero_jodhpur_blue_city.jpg'));
  console.log('✓ Copied hero_jodhpur_blue_city.jpg to client/public/images/');
}

async function updateDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    await Setting.collection.updateOne(
      {},
      {
        $set: {
          homeHeroImage1: '/images/hero_jodhpur_blue_city.jpg',
          homeHeroImage2: '/images/hero_taj_mahal_sunrise.jpg',
          homeHeroImage3: '/images/hero_rajasthan_fort_palace.jpg',
          homeHeroImage4: '/images/hero_kerala_houseboat.jpg'
        }
      },
      { upsert: true }
    );

    console.log('✓ Updated MongoDB Setting homeHeroImage1 to /images/hero_jodhpur_blue_city.jpg!');
    process.exit(0);
  } catch (err) {
    console.error('Error updating DB:', err);
    process.exit(1);
  }
}

updateDatabase();
