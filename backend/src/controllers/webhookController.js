const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Subscription = require('../models/Subscription');

class WebhookController {
  static async handleStripeWebhook(req, res) {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    switch (event.type) {
      case 'invoice.payment_succeeded':
        const subscription = await Subscription.findByStripeId(event.data.object.subscription);
        if (subscription) {
          await Subscription.updateStatus(subscription.id, 'active');
        }
        break;

      case 'customer.subscription.deleted':
        const cancelledSubscription = await Subscription.findByStripeId(event.data.object.id);
        if (cancelledSubscription) {
          await Subscription.updateStatus(cancelledSubscription.id, 'cancelled');
        }
        break;
    }

    res.json({ received: true });
  }
}

module.exports = WebhookController; 