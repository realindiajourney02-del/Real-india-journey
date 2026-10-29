const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();

// Connect MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Routes - Support both /api/* and root /* (for api.realindiajourney.com subdomain)
const registerRoute = (basePath, router) => {
  app.use(`/api${basePath}`, router);
  app.use(basePath, router);
};

registerRoute('/auth', require('./routes/authRoutes'));
registerRoute('/packages', require('./routes/packageRoutes'));
registerRoute('/enquiries', require('./routes/enquiryRoutes'));
registerRoute('/contacts', require('./routes/contactRoutes'));
registerRoute('/testimonials', require('./routes/testimonialRoutes'));
registerRoute('/blogs', require('./routes/blogRoutes'));
registerRoute('/cars', require('./routes/carRoutes'));
registerRoute('/categories', require('./routes/categoryRoutes'));
registerRoute('/settings', require('./routes/settingRoutes'));
registerRoute('/upload', require('./routes/uploadRoutes'));

// Health check endpoint (accessible at /, /health, and /api/health)
app.get(['/', '/health', '/api/health'], (req, res) => {
  res.json({
    status: 'active',
    message: 'Real India Journey API operational',
    targetEmail: 'info@realindiajourney.com',
    version: '2.2-info-mail'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Internal Server Error' });
});

// Serve static assets in production if build exists
const fs = require('fs');
const publicDistPath = fs.existsSync(path.join(__dirname, 'public'))
  ? path.join(__dirname, 'public')
  : path.join(__dirname, '../client/dist');

if (fs.existsSync(publicDistPath)) {
  app.use(express.static(publicDistPath));
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.resolve(publicDistPath, 'index.html'));
    }
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`[Safaré API Server] Running on port ${PORT}`);
});
