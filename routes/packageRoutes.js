const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../models/Package');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

// Helper to check if MongoDB is active
const isDbConnected = () => {
  return Boolean(global.isMongoConnected || mongoose.connection.readyState === 1);
};

// Utility to generate clean URL slug
const slugify = (text) => {
  if (!text) return `pkg-${Date.now()}`;
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-');
};

// Build robust MongoDB query filter by key (_id or slug)
function buildPackageQuery(key) {
  if (!key) return {};
  const cleanKey = String(key).trim();
  const conditions = [];

  // 1. Check if 24-character hexadecimal ObjectId
  if (mongoose.Types.ObjectId.isValid(cleanKey) && /^[0-9a-fA-F]{24}$/.test(cleanKey)) {
    try {
      conditions.push({ _id: new mongoose.Types.ObjectId(cleanKey) });
    } catch (e) {}
  }

  // 2. Also check _id as exact string (for non-ObjectId string IDs)
  conditions.push({ _id: cleanKey });

  // 3. Exact slug match
  conditions.push({ slug: cleanKey });

  // 4. Decoded URI component slug if different
  try {
    const decoded = decodeURIComponent(cleanKey);
    if (decoded !== cleanKey) {
      conditions.push({ slug: decoded });
    }
  } catch (e) {}

  // 5. Case-insensitive slug regex match
  const escaped = cleanKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  conditions.push({ slug: { $regex: `^${escaped}$`, $options: 'i' } });

  return { $or: conditions };
}

// Normalize package input fields before saving
function normalizePackageData(data) {
  const norm = { ...data };

  // Sync price and priceVal
  if (norm.price && (!norm.priceVal || isNaN(Number(norm.priceVal)))) {
    const numeric = parseInt(String(norm.price).replace(/[^0-9]/g, ''), 10);
    norm.priceVal = isNaN(numeric) ? 0 : numeric;
  } else if (norm.priceVal !== undefined && norm.priceVal !== null && !norm.price) {
    norm.price = `₹${Number(norm.priceVal).toLocaleString('en-IN')}`;
  } else if (!norm.price && !norm.priceVal) {
    norm.price = 'On Request';
    norm.priceVal = 0;
  }

  // Sync duration and daysCount/nightsCount
  if (norm.duration) {
    if (!norm.daysCount || isNaN(Number(norm.daysCount))) {
      const dayMatch = String(norm.duration).match(/(\d+)\s*Day/i);
      norm.daysCount = dayMatch ? parseInt(dayMatch[1], 10) : 1;
    }
    if ((norm.nightsCount === undefined || norm.nightsCount === null || isNaN(Number(norm.nightsCount)))) {
      const nightMatch = String(norm.duration).match(/(\d+)\s*Night/i);
      norm.nightsCount = nightMatch ? parseInt(nightMatch[1], 10) : Math.max(0, Number(norm.daysCount) - 1);
    }
  } else {
    norm.duration = `${norm.daysCount || 1} Days / ${norm.nightsCount || 0} Nights`;
  }

  // Ensure overview and description are populated
  norm.overview = (norm.overview || norm.description || norm.title || '').trim();
  norm.description = (norm.description || norm.overview || '').trim();

  // Normalize highlights
  if (typeof norm.highlightsText === 'string') {
    norm.highlights = norm.highlightsText.split('\n').map(h => h.trim()).filter(Boolean);
    delete norm.highlightsText;
  } else if (Array.isArray(norm.highlights)) {
    norm.highlights = norm.highlights.map(h => typeof h === 'string' ? h.trim() : h).filter(Boolean);
  }

  // Normalize itinerary
  if (Array.isArray(norm.itinerary)) {
    norm.itinerary = norm.itinerary.map(item => ({
      day: item.day || '01',
      title: (item.title || '').trim(),
      desc: (item.desc || item.description || '').trim(),
      highlights: Array.isArray(item.highlights)
        ? item.highlights
        : (typeof item.highlightsText === 'string' ? item.highlightsText.split('\n').map(h => h.trim()).filter(Boolean) : [])
    }));
  }

  return norm;
}

// ==========================================
// @route   GET /api/packages
// @desc    Get all tour packages with filters
// ==========================================
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, search, featured, sort } = req.query;

    if (!isDbConnected()) {
      let list = [...memoryStore.packages];

      if (category && category !== 'all') {
        const catLower = category.trim().toLowerCase();
        list = list.filter(p => (p.category || '').trim().toLowerCase() === catLower);
      }

      if (subcategory && subcategory.trim()) {
        const subLower = subcategory.trim().toLowerCase();
        list = list.filter(p => {
          const pkgSub = (p.subcategory || '').trim().toLowerCase();
          const pkgTitle = (p.title || '').trim().toLowerCase();
          const pkgSlug = (p.slug || '').trim().toLowerCase();

          if ((pkgTitle.includes('masuri') || pkgSlug.includes('masuri') || pkgTitle.includes('mussoorie')) && subLower !== 'masuri' && subLower !== 'mussoorie') {
            return false;
          }

          if ((pkgTitle.includes('uttrakhand') || pkgSlug.includes('uttrakhand') || pkgTitle.includes('uttarakhand')) && (subLower === 'masuri' || subLower === 'mussoorie')) {
            return false;
          }

          if (pkgSub) {
            return pkgSub === subLower;
          }
          return pkgTitle === subLower || pkgSlug === subLower || pkgTitle.includes(subLower) || pkgSlug.includes(subLower);
        });
      }

      if (featured === 'true') {
        list = list.filter(p => p.isFeatured);
      }

      if (search) {
        const s = search.toLowerCase().trim();
        const norm = s.replace(/odisa/g, 'odisha').replace(/orissa/g, 'odisha');
        list = list.filter(p => {
          const match = (val) => {
            if (!val) return false;
            const str = String(val).toLowerCase();
            return str.includes(s) || str.includes(norm);
          };
          return (
            match(p.title) ||
            match(p.route) ||
            match(p.description) ||
            match(p.subcategory) ||
            match(p.category) ||
            match(p.slug) ||
            match(p.overview) ||
            match(p.accommodations) ||
            (Array.isArray(p.highlights) && p.highlights.some(h => match(h)))
          );
        });
      }

      if (sort === 'price-low') list.sort((a, b) => (a.priceVal || 0) - (b.priceVal || 0));
      if (sort === 'price-high') list.sort((a, b) => (b.priceVal || 0) - (a.priceVal || 0));
      if (sort === 'duration') list.sort((a, b) => (b.daysCount || 0) - (a.daysCount || 0));
      return res.json(list);
    }

    let query = {};

    if (category && category !== 'all') {
      query.category = { $regex: `^${category.trim()}$`, $options: 'i' };
    }

    if (subcategory && subcategory.trim()) {
      const subLower = subcategory.trim().toLowerCase();
      query.$and = [
        {
          $or: [
            { subcategory: { $regex: `^${subcategory.trim()}$`, $options: 'i' } },
            { 
              $and: [
                { $or: [{ subcategory: { $exists: false } }, { subcategory: '' }, { subcategory: null }] },
                { $or: [{ title: { $regex: subcategory.trim(), $options: 'i' } }, { slug: { $regex: subcategory.trim(), $options: 'i' } }] }
              ]
            }
          ]
        }
      ];

      if (subLower !== 'masuri' && subLower !== 'mussoorie') {
        query.$and.push({ title: { $not: { $regex: 'masuri|mussoorie', $options: 'i' } } });
      }
      if (subLower === 'masuri' || subLower === 'mussoorie') {
        query.$and.push({ title: { $not: { $regex: 'uttrakhand|uttarakhand', $options: 'i' } } });
      }
    }

    if (featured === 'true') query.isFeatured = true;

    if (search) {
      const s = search.trim();
      const norm = s.toLowerCase().replace(/odisa/g, 'odisha').replace(/orissa/g, 'odisha');
      const searchTerms = Array.from(new Set([s, norm])).filter(Boolean);

      const searchCondition = [];
      searchTerms.forEach(term => {
        searchCondition.push(
          { title: { $regex: term, $options: 'i' } },
          { route: { $regex: term, $options: 'i' } },
          { description: { $regex: term, $options: 'i' } },
          { subcategory: { $regex: term, $options: 'i' } },
          { category: { $regex: term, $options: 'i' } },
          { slug: { $regex: term, $options: 'i' } },
          { overview: { $regex: term, $options: 'i' } },
          { accommodations: { $regex: term, $options: 'i' } }
        );
      });

      if (query.$and) {
        query.$and.push({ $or: searchCondition });
      } else if (query.$or) {
        query = {
          $and: [
            { category: query.category },
            { $or: query.$or },
            { $or: searchCondition }
          ]
        };
      } else {
        query.$or = searchCondition;
      }
    }

    let sortOptions = { createdAt: -1 };
    if (sort === 'price-low') sortOptions = { priceVal: 1 };
    if (sort === 'price-high') sortOptions = { priceVal: -1 };
    if (sort === 'duration') sortOptions = { daysCount: -1 };

    const packages = await Package.find(query).sort(sortOptions).lean();
    res.json(packages);
  } catch (error) {
    console.error('[Packages API] Error listing packages:', error);
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// @route   GET /api/packages/:id
// @desc    Get single package by ID or Slug
// ==========================================
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;

    if (!isDbConnected()) {
      const found = memoryStore.packages.find(p => 
        p.slug === key || 
        p._id === key || 
        p.slug === decodeURIComponent(key) ||
        (p.slug && p.slug.toLowerCase() === key.toLowerCase()) ||
        (p._id && String(p._id) === String(key))
      );
      if (!found) return res.status(404).json({ message: 'Package not found' });
      return res.json(found);
    }

    const filter = buildPackageQuery(key);
    let packageItem = await Package.findOne(filter).lean();

    // Fallback: search raw collection directly (handles non-ObjectId string _id values)
    if (!packageItem) {
      try {
        packageItem = await Package.collection.findOne({
          $or: [
            { _id: key },
            { slug: key },
            { slug: key.toLowerCase() },
            { slug: decodeURIComponent(key) }
          ]
        });
      } catch (e) {}
    }

    // Fallback search: fuzzy regex match on title or slug
    if (!packageItem) {
      const slugLike = key.replace(/[-_]/g, '.*');
      packageItem = await Package.findOne({
        $or: [
          { slug: { $regex: slugLike, $options: 'i' } },
          { title: { $regex: slugLike, $options: 'i' } }
        ]
      }).lean();
    }

    if (!packageItem) return res.status(404).json({ message: 'Package not found' });
    res.json(packageItem);
  } catch (error) {
    console.error(`[Packages API] Error fetching package "${req.params.id}":`, error);
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// @route   POST /api/packages
// @desc    Add new tour package to MongoDB
// ==========================================
router.post('/', protectAdmin, async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ message: 'Package Title is required' });
    }

    // Generate or sanitize slug
    let finalSlug = req.body.slug ? slugify(req.body.slug) : slugify(title);
    if (!finalSlug) finalSlug = `pkg-${Date.now()}`;

    const normalized = normalizePackageData(req.body);
    delete normalized._id; // Ensure clean new document ID

    if (!isDbConnected()) {
      // In-Memory store handling
      let existingSlug = memoryStore.packages.find(p => p.slug === finalSlug);
      if (existingSlug) {
        finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
      }

      const newPkg = {
        _id: `pkg-${Date.now()}`,
        ...normalized,
        slug: finalSlug,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      memoryStore.packages.unshift(newPkg);
      memoryStore.saveToDisk();
      return res.status(201).json(newPkg);
    }

    // Ensure unique slug in MongoDB
    const existingPkg = await Package.findOne({ slug: finalSlug });
    if (existingPkg) {
      finalSlug = `${finalSlug}-${Date.now().toString().slice(-4)}`;
    }

    const docToSave = {
      ...normalized,
      slug: finalSlug,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save using Mongoose model
    const createdPackage = await Package.create(docToSave);
    const result = await Package.findById(createdPackage._id).lean();

    // Also keep memoryStore synchronized
    if (Array.isArray(memoryStore.packages)) {
      memoryStore.packages.unshift(result);
    }

    res.status(201).json(result);
  } catch (error) {
    console.error('[Packages API] Error creating package:', error);
    res.status(400).json({ message: error.message });
  }
});

// ==========================================
// @route   PUT /api/packages/:id
// @desc    Edit existing package in MongoDB
// ==========================================
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!isDbConnected()) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      const updated = {
        ...memoryStore.packages[index],
        ...normalizePackageData(req.body),
        updatedAt: new Date().toISOString()
      };
      memoryStore.packages[index] = updated;
      memoryStore.saveToDisk();
      return res.json(updated);
    }

    const filter = buildPackageQuery(key);
    const updateData = normalizePackageData(req.body);
    delete updateData._id;
    updateData.updatedAt = new Date();

    // If slug is provided and modified, sanitize and ensure uniqueness
    if (updateData.slug) {
      updateData.slug = slugify(updateData.slug);
      const existingOther = await Package.findOne({
        slug: updateData.slug,
        $nor: [filter]
      });
      if (existingOther) {
        updateData.slug = `${updateData.slug}-${Date.now().toString().slice(-4)}`;
      }
    }

    // Execute atomic update and return updated document
    let updatedPackage = await Package.findOneAndUpdate(
      filter,
      { $set: updateData },
      { new: true, runValidators: false }
    ).lean();

    // Fallback: check raw collection directly for non-ObjectId string _id
    if (!updatedPackage) {
      try {
        await Package.collection.updateOne(
          { $or: [{ _id: key }, { slug: key }] },
          { $set: updateData }
        );
        updatedPackage = await Package.collection.findOne({
          $or: [{ _id: key }, { slug: updateData.slug || key }]
        });
      } catch (e) {}
    }

    if (!updatedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Keep memoryStore synchronized
    if (Array.isArray(memoryStore.packages)) {
      const mIdx = memoryStore.packages.findIndex(p => String(p._id) === String(key) || p.slug === key);
      if (mIdx !== -1) {
        memoryStore.packages[mIdx] = { ...memoryStore.packages[mIdx], ...updatedPackage };
      }
    }

    res.json(updatedPackage);
  } catch (error) {
    console.error(`[Packages API] Error updating package "${req.params.id}":`, error);
    res.status(400).json({ message: error.message });
  }
});

// ==========================================
// @route   DELETE /api/packages/:id
// @desc    Delete package from MongoDB
// ==========================================
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!isDbConnected()) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      memoryStore.packages.splice(index, 1);
      memoryStore.saveToDisk();
      return res.json({ message: 'Package removed successfully', id: key });
    }

    const filter = buildPackageQuery(key);
    let deletedPackage = await Package.findOneAndDelete(filter);

    // Fallback: delete from raw collection (handles non-ObjectId string _id values)
    if (!deletedPackage) {
      try {
        const rawRes = await Package.collection.deleteOne({
          $or: [{ _id: key }, { slug: key }]
        });
        if (rawRes && rawRes.deletedCount > 0) {
          deletedPackage = { _id: key };
        }
      } catch (e) {}
    }

    if (!deletedPackage) {
      return res.status(404).json({ message: 'Package not found' });
    }

    // Also remove from inMemoryStore if present
    if (Array.isArray(memoryStore.packages)) {
      const mIdx = memoryStore.packages.findIndex(p => String(p._id) === String(key) || p.slug === key);
      if (mIdx !== -1) {
        memoryStore.packages.splice(mIdx, 1);
        memoryStore.saveToDisk();
      }
    }

    res.json({ message: 'Package removed successfully', id: key });
  } catch (error) {
    console.error(`[Packages API] Error deleting package "${req.params.id}":`, error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
