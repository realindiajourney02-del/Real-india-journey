const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package');

dotenv.config({ path: '../.env' });

async function listPackages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const pkgs = await Package.find({}).lean();
    console.log(`TOTAL PACKAGES: ${pkgs.length}\n`);
    pkgs.forEach((p, idx) => {
      console.log(`--- [Package #${idx + 1}] ---`);
      console.log(`ID: ${p._id}`);
      console.log(`Title: ${p.title}`);
      console.log(`Category: ${p.category} | Subcategory: ${p.subcategory || 'N/A'}`);
      console.log(`Cover Image: ${p.image}`);
      console.log(`Hero Images (${(p.heroImages || []).length}):`, p.heroImages);
      console.log(`Route: ${p.route}\n`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listPackages();
