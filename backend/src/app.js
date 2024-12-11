const express = require('express');
const cors = require('cors');
const { apiLimiter, authLimiter } = require('./middleware/rateLimiter');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const matchingRoutes = require('./features/matching/routes/matchingRoutes');
const subscriptionRoutes = require('./features/subscription/routes/subscriptionRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Save raw body for Stripe webhook
app.use('/webhook', express.raw({ type: 'application/json' }));

// Apply rate limiting to all routes
app.use(apiLimiter);

// Apply stricter rate limiting to auth routes
app.use('/api/auth', authLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/matching', matchingRoutes);
app.use('/api/subscriptions', subscriptionRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'healthy' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 