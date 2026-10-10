const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Package = require('../models/Package');

const path = require('path');
dotenv.config({ path: path.join(__dirname, '../.env') });

// 100% Unique, Curated, High-Resolution Unsplash Images matched to each package's location & theme
const UNIQUE_PACKAGE_IMAGES = [
  {
    slugKeywords: ['same-day-taj-mahal-agra-tour-by-car', 'same-day-taj'],
    cover: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=85',
    hero: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1585135497273-1a86b09fe707?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['same-day-agra-tour-by-superfast-gatimaan-train', 'gatimaan'],
    cover: 'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1200&q=85',
    hero: [
      'https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['golden-triangle-heritage-classic', '7-days-6-nights'],
    cover: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=85',
    hero: [
      'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1603258850785-5b4c10714a63?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['golden-triangle-classic-tour', 'classic-3-days', 'golden-triangle-classic'],
    cover: '/images/golden_triangle_classic.jpg',
    hero: [
      '/images/golden_triangle_classic.jpg',
      'https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['rajasthan-royal-forts', 'forts-and-palaces', 'rajasthan-forts-palaces'],
    cover: '/images/jodhpur_blue_city.jpg',
    hero: [
      '/images/jodhpur_blue_city.jpg',
      'https://images.unsplash.com/photo-1609828913642-a9b0c2e36125?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1588096344356-9a29633e7694?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['luxury-collection', 'wildlife', 'heritage-and-wildlife'],
    cover: '/images/luxury_wildlife_tiger.jpg',
    hero: [
      '/images/luxury_wildlife_tiger.jpg',
      'https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1575995872537-3793d29d972c?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['gems-of-north-india-grand-odyssey', 'north-india', 'gems-of-north-india'],
    cover: '/images/gems_north_india.jpg',
    hero: [
      '/images/gems_north_india.jpg',
      'https://images.unsplash.com/photo-1627894099065-921d1d8f1e5a?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['odisha', 'bastar-tribal'],
    cover: '/images/odisha_bastar_tribal.jpg',
    hero: [
      '/images/odisha_bastar_tribal.jpg',
      'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['bhutan', 'himalayan-odyssey'],
    cover: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    hero: [
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['colors-of-rajasthan', '10-days'],
    cover: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=85',
    hero: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['rural-rajasthan', 'rular-rajasthan', 'rural-rajasthan-15-days'],
    cover: '/images/rural_rajasthan_heritage.jpg',
    hero: [
      '/images/rural_rajasthan_heritage.jpg',
      'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['deccan-discovery', 'deccan'],
    cover: '/images/hampi_deccan_ruins.jpg',
    hero: [
      '/images/hampi_deccan_ruins.jpg',
      'https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['central-treasure-trail', 'heritage-expedition-of-central-india'],
    cover: '/images/central_india_heritage.jpg',
    hero: [
      '/images/central_india_heritage.jpg',
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1603258850785-5b4c10714a63?auto=format&fit=crop&w=1600&q=85'
    ]
  },
  {
    slugKeywords: ['jewels-of-south-india', 'south-india'],
    cover: '/images/hero_kerala_houseboat.jpg',
    hero: [
      '/images/hero_kerala_houseboat.jpg',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85'
    ]
  }
];

async function updateUniqueImages() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB.');

    const packages = await Package.find({});
    console.log(`Processing ${packages.length} packages...`);

    const usedImagesSet = new Set();

    for (const pkg of packages) {
      const matchConfig = UNIQUE_PACKAGE_IMAGES.find(cfg => {
        const pSlug = (pkg.slug || '').toLowerCase();
        const pTitle = (pkg.title || '').toLowerCase();
        return cfg.slugKeywords.some(kw => pSlug.includes(kw) || pTitle.includes(kw));
      });

      if (matchConfig) {
        const coverImg = matchConfig.cover;
        const heroImgs = matchConfig.hero;

        usedImagesSet.add(coverImg);
        heroImgs.forEach(img => usedImagesSet.add(img));

        await Package.collection.updateOne(
          { _id: pkg._id },
          { 
            $set: { 
              image: coverImg, 
              heroImages: heroImgs 
            } 
          }
        );

        console.log(`✓ Updated "${pkg.title}" with unique images (${heroImgs.length} slides)`);
      } else {
        console.warn(`⚠️ No specific match config for package: "${pkg.title}" (${pkg.slug})`);
      }
    }

    console.log(`\nAll packages updated successfully! Total Unique Images Used: ${usedImagesSet.size}`);
    process.exit(0);
  } catch (err) {
    console.error('Error applying unique images:', err);
    process.exit(1);
  }
}

updateUniqueImages();
