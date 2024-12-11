const SubscriptionService = require('../services/subscriptionService');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class SubscriptionController {
    static async createSubscription(req, res) {
        try {
            const userId = req.user.id;
            const { priceId } = req.body;
            
            const subscription = await SubscriptionService.createSubscription(userId, priceId);
            res.status(201).json({
                clientSecret: subscription.clientSecret,
                subscriptionId: subscription.subscriptionId
            });
        } catch (error) {
            console.error('Subscription creation error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getSubscriptionStatus(req, res) {
        try {
            const userId = req.user.id;
            const subscription = await SubscriptionService.getSubscriptionStatus(userId);
            res.status(200).json(subscription);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async cancelSubscription(req, res) {
        try {
            const userId = req.user.id;
            const subscription = await SubscriptionService.cancelSubscription(userId);
            res.status(200).json(subscription);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }

    static async handleWebhook(req, res) {
        const sig = req.headers['stripe-signature'];
        let event;

        try {
            console.log('Received webhook event');
            
            // Verify the webhook signature
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET
            );

            console.log('Webhook event verified:', event.type);

            // Handle different event types
            switch (event.type) {
                case 'payment_intent.succeeded':
                    console.log('Processing payment success:', event.data.object.id);
                    await SubscriptionService.handlePaymentSuccess(event.data.object);
                    break;
                case 'payment_intent.failed':
                    console.log('Processing payment failure:', event.data.object.id);
                    await SubscriptionService.handlePaymentFailure(event.data.object);
                    break;
                case 'customer.subscription.deleted':
                    console.log('Processing subscription cancellation:', event.data.object.id);
                    await SubscriptionService.handleSubscriptionCancelled(event.data.object);
                    break;
                case 'customer.subscription.updated':
                    console.log('Processing subscription update:', event.data.object.id);
                    await SubscriptionService.handleSubscriptionUpdated(event.data.object);
                    break;
                default:
                    console.log('Unhandled event type:', event.type);
            }

            console.log('Webhook processed successfully');
            res.json({ received: true });
        } catch (error) {
            console.error('Webhook error:', error.message);
            console.error('Error details:', error);
            res.status(400).json({ error: error.message });
        }
    }
}

module.exports = SubscriptionController; 