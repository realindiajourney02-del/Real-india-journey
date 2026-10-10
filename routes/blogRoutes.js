const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const memoryStore = require('../data/inMemoryStore');

// Utility to generate slug
const slugify = (text) => {
  if (!text) return `blog-${Date.now()}`;
  const slug = text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/[\s-]+/g, '-');
  return slug || `blog-${Date.now()}`;
};

// GET /api/blogs - Get published blogs
router.get('/', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const list = memoryStore.blogs.filter(b => b.isPublished);
      return res.json(list);
    }
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs', error: err.message });
  }
});

// GET /api/blogs/admin - Get all blogs for admin
router.get('/admin', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      return res.json(memoryStore.blogs);
    }
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blogs', error: err.message });
  }
});

// GET /api/blogs/:id - Get single blog by ID or slug
router.get('/:id', async (req, res) => {
  try {
    const key = req.params.id;

    if (!global.isMongoConnected) {
      const found = memoryStore.blogs.find(b => b._id === key || b.slug === key);
      if (!found) return res.status(404).json({ message: 'Blog post not found' });
      return res.json(found);
    }

    const conditions = [{ _id: key }, { slug: key }];
    if (/^[0-9a-fA-F]{24}$/.test(key)) {
      try {
        conditions.push({ _id: new mongoose.Types.ObjectId(key) });
      } catch (e) {}
    }
    const blog = await Blog.findOne({ $or: conditions });
    if (!blog) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving blog', error: err.message });
  }
});

// POST /api/blogs - Create new blog
router.post('/', async (req, res) => {
  try {
    let { title, slug, category, date, author, readTime, image, excerpt, content, isPublished } = req.body;

    if (!title || !excerpt || !content) {
      return res.status(400).json({ message: 'Title, excerpt, and content are required' });
    }

    if (!slug || !slug.trim()) {
      slug = slugify(title);
    } else {
      slug = slugify(slug);
    }

    if (!global.isMongoConnected) {
      let existing = memoryStore.blogs.find(b => b.slug === slug);
      if (existing) {
        slug = `${slug}-${Date.now().toString().slice(-4)}`;
      }
      const newBlog = {
        _id: `blog-${Date.now()}`,
        title,
        slug,
        category: category || 'Travel Guides',
        date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        author: author || 'Real India Journey Team',
        readTime: readTime || '5 min read',
        image: image || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
        excerpt,
        content,
        isPublished: isPublished !== undefined ? Boolean(isPublished) : true,
        createdAt: new Date().toISOString()
      };
      memoryStore.blogs.unshift(newBlog);
      memoryStore.saveToDisk();
      return res.status(201).json({ message: 'Blog post created successfully', blog: newBlog });
    }

    // Ensure unique slug in MongoDB
    let existing = await Blog.findOne({ slug });
    if (existing) {
      slug = `${slug}-${Date.now().toString().slice(-4)}`;
    }

    const newBlog = new Blog({
      title,
      slug,
      category: category || 'Travel Guides',
      date: date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author: author || 'Real India Journey Team',
      readTime: readTime || '5 min read',
      image: image || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
      excerpt,
      content,
      isPublished: isPublished !== undefined ? Boolean(isPublished) : true
    });

    const saved = await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully', blog: saved });
  } catch (err) {
    console.error('Error creating blog:', err);
    res.status(500).json({ message: 'Error creating blog', error: err.message });
  }
});

// PUT /api/blogs/:id - Update blog
router.put('/:id', async (req, res) => {
  try {
    const { title, slug, category, date, author, readTime, image, excerpt, content, isPublished } = req.body;

    if (!global.isMongoConnected) {
      const idx = memoryStore.blogs.findIndex(b => b._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Blog post not found' });

      if (title !== undefined) memoryStore.blogs[idx].title = title;
      if (slug !== undefined) memoryStore.blogs[idx].slug = slugify(slug);
      if (category !== undefined) memoryStore.blogs[idx].category = category;
      if (date !== undefined) memoryStore.blogs[idx].date = date;
      if (author !== undefined) memoryStore.blogs[idx].author = author;
      if (readTime !== undefined) memoryStore.blogs[idx].readTime = readTime;
      if (image !== undefined) memoryStore.blogs[idx].image = image;
      if (excerpt !== undefined) memoryStore.blogs[idx].excerpt = excerpt;
      if (content !== undefined) memoryStore.blogs[idx].content = content;
      if (isPublished !== undefined) memoryStore.blogs[idx].isPublished = Boolean(isPublished);

      memoryStore.saveToDisk();
      return res.json({ message: 'Blog post updated successfully', blog: memoryStore.blogs[idx] });
    }

    let updateData = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (date !== undefined) updateData.date = date;
    if (author !== undefined) updateData.author = author;
    if (readTime !== undefined) updateData.readTime = readTime;
    if (image !== undefined) updateData.image = image;
    if (excerpt !== undefined) updateData.excerpt = excerpt;
    if (content !== undefined) updateData.content = content;
    if (isPublished !== undefined) updateData.isPublished = Boolean(isPublished);
    if (slug) updateData.slug = slugify(slug);

    const updated = await Blog.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Blog post not found' });
    }

    res.json({ message: 'Blog post updated successfully', blog: updated });
  } catch (err) {
    res.status(500).json({ message: 'Error updating blog', error: err.message });
  }
});

// DELETE /api/blogs/:id - Delete blog
router.delete('/:id', async (req, res) => {
  try {
    if (!global.isMongoConnected) {
      const idx = memoryStore.blogs.findIndex(b => b._id === req.params.id);
      if (idx === -1) return res.status(404).json({ message: 'Blog post not found' });
      memoryStore.blogs.splice(idx, 1);
      memoryStore.saveToDisk();
      return res.json({ message: 'Blog post deleted successfully' });
    }

    const key = req.params.id;
    const conditions = [{ _id: key }, { slug: key }];
    if (/^[0-9a-fA-F]{24}$/.test(key)) {
      try {
        conditions.push({ _id: new mongoose.Types.ObjectId(key) });
      } catch (e) {}
    }
    const deleted = await Blog.findOneAndDelete({ $or: conditions });
    if (!deleted) {
      return res.status(404).json({ message: 'Blog post not found' });
    }
    res.json({ message: 'Blog post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting blog', error: err.message });
  }
});

module.exports = router;
