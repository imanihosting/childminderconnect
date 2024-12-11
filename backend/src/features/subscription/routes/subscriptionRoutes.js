const express = require('express');
const router = express.Router();
const SubscriptionController = require('../controllers/subscriptionController');
const { subscriptionValidation } = require('../../../middleware/validators');
const auth = require('../../../middleware/auth');

// Webhook route (no auth required, raw body for Stripe)
router.post(
    '/webhook',
    express.raw({ type: 'application/json' }),
    SubscriptionController.handleWebhook
);

// Protected routes with validation
router.use(auth);
router.post('/create', subscriptionValidation, SubscriptionController.createSubscription);
router.get('/status', SubscriptionController.getSubscriptionStatus);
router.post('/cancel', SubscriptionController.cancelSubscription);

module.exports = router; 