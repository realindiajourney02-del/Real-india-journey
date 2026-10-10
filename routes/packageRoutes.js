const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Package = require('../models/Package');
const memoryStore = require('../data/inMemoryStore');
const { protectAdmin } = require('../middleware/authMiddleware');

// @route   GET /api/packages
router.get('/', async (req, res) => {
  try {
    const { category, subcategory, search, featured, sort, includeSubcategories } = req.query;

    if (!global.isMongoConnected) {
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

          // Exclude mismatched packages (e.g. title/slug is 'masuri' when subcategory query is 'uttrakhand')
          if ((pkgTitle.includes('masuri') || pkgSlug.includes('masuri') || pkgTitle.includes('mussoorie')) && subLower !== 'masuri' && subLower !== 'mussoorie') {
            return false;
          }

          if ((pkgTitle.includes('uttrakhand') || pkgSlug.includes('uttrakhand') || pkgTitle.includes('uttarakhand')) && (subLower === 'masuri' || subLower === 'mussoorie')) {
            return false;
          }

          if (pkgSub) {
            return pkgSub === subLower;
          }
          // If subcategory not set on package, fallback match title or slug
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

      if (sort === 'price-low') list.sort((a, b) => a.priceVal - b.priceVal);
      if (sort === 'price-high') list.sort((a, b) => b.priceVal - a.priceVal);
      if (sort === 'duration') list.sort((a, b) => b.daysCount - a.daysCount);
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

      // Exclude mismatched titles
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
    res.status(500).json({ message: error.message });
  }
});

function buildPackageQuery(key) {
  if (!key) return {};
  const cleanKey = String(key).trim();
  const conditions = [];

  const isValidObjectId = mongoose.Types.ObjectId.isValid(cleanKey) && /^[0-9a-fA-F]{24}$/.test(cleanKey);

  if (isValidObjectId) {
    try {
      conditions.push({ _id: new mongoose.Types.ObjectId(cleanKey) });
    } catch (e) {}
  }

  // Always query by slug
  conditions.push({ slug: cleanKey });

  // Query decoded URI component if different
  try {
    const decoded = decodeURIComponent(cleanKey);
    if (decoded !== cleanKey) {
      conditions.push({ slug: decoded });
    }
  } catch (e) {}

  // Case-insensitive regex match on slug
  const escaped = cleanKey.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
  conditions.push({ slug: { $regex: `^${escaped}$`, $options: 'i' } });

  return { $or: conditions };
}

// @route   GET /api/packages/:id
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
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
      const slugLike = key.replace(/-/g, '.*');
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
    console.error(`[Packages API] Error fetching package with key "${req.params.id}":`, error);
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/packages
router.post('/', protectAdmin, async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const newPkg = {
        _id: `pkg-${Date.now()}`,
        slug: req.body.slug || req.body.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
        ...req.body
      };
      memoryStore.packages.unshift(newPkg);
      memoryStore.saveToDisk();
      return res.status(201).json(newPkg);
    }

    const doc = {
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    const result = await Package.collection.insertOne(doc);
    const savedPackage = await Package.findById(result.insertedId).lean();
    res.status(201).json(savedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   PUT /api/packages/:id
router.put('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      memoryStore.packages[index] = { ...memoryStore.packages[index], ...req.body };
      memoryStore.saveToDisk();
      return res.json(memoryStore.packages[index]);
    }

    const filter = buildPackageQuery(key);
    const updateData = { ...req.body, updatedAt: new Date() };
    delete updateData._id;

    await Package.collection.updateOne(filter, { $set: updateData });
    const updatedPackage = await Package.findOne(filter).lean();
    if (!updatedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json(updatedPackage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// @route   DELETE /api/packages/:id
router.delete('/:id', protectAdmin, async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const index = memoryStore.packages.findIndex(p => p._id === key || p.slug === key);
      if (index === -1) return res.status(404).json({ message: 'Package not found' });
      memoryStore.packages.splice(index, 1);
      memoryStore.saveToDisk();
      return res.json({ message: 'Package removed successfully' });
    }

    const filter = buildPackageQuery(key);
    const deletedPackage = await Package.findOneAndDelete(filter);
    if (!deletedPackage) return res.status(404).json({ message: 'Package not found' });
    res.json({ message: 'Package removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
