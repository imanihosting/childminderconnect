const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const pool = require('../../../config/database');
const Subscription = require('../models/Subscription');

class SubscriptionService {
    static async createSubscription(userId, priceId) {
        try {
            // Get user details for Stripe customer creation
            const user = await pool.query('SELECT email FROM users WHERE id = $1', [userId]);
            
            if (!user.rows[0]) {
                throw new Error('User not found');
            }

            // Get plan_id from subscription_plans table
            const planResult = await pool.query(
                'SELECT id FROM subscription_plans WHERE stripe_price_id = $1',
                [priceId]
            );

            if (!planResult.rows[0]) {
                throw new Error('Invalid subscription plan');
            }

            // Create or retrieve Stripe customer
            let customer;
            const existingCustomers = await stripe.customers.list({ email: user.rows[0].email });
            
            if (existingCustomers.data.length > 0) {
                customer = existingCustomers.data[0];
            } else {
                customer = await stripe.customers.create({
                    email: user.rows[0].email,
                    metadata: { userId: userId }
                });
            }

            // Create the subscription in Stripe
            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: priceId }],
                payment_behavior: 'default_incomplete',
                expand: ['latest_invoice.payment_intent']
            });

            // Save subscription to database
            await pool.query(
                `INSERT INTO user_subscriptions 
                (user_id, plan_id, stripe_subscription_id, status, start_date, end_date)
                VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + interval '1 month')`,
                [userId, planResult.rows[0].id, subscription.id, 'active']
            );

            // Return the client secret for payment confirmation
            return {
                subscriptionId: subscription.id,
                clientSecret: subscription.latest_invoice.payment_intent.client_secret
            };
        } catch (error) {
            throw new Error(`Error creating subscription: ${error.message}`);
        }
    }

    static async getSubscriptionStatus(userId) {
        try {
            // Modified query to get the most recent subscription regardless of status
            const query = `
                SELECT us.*, sp.name as plan_name, sp.price, sp.features
                FROM user_subscriptions us
                JOIN subscription_plans sp ON us.plan_id = sp.id
                WHERE us.user_id = $1
                ORDER BY us.created_at DESC
                LIMIT 1
            `;
            
            const result = await pool.query(query, [userId]);
            const subscription = result.rows[0];
            
            if (!subscription) {
                throw new Error('No subscription found');
            }

            // Get Stripe subscription status
            const stripeSubscription = await stripe.subscriptions.retrieve(subscription.stripe_subscription_id);
            
            return {
                ...subscription,
                stripeStatus: stripeSubscription.status
            };
        } catch (error) {
            throw new Error(`Error getting subscription status: ${error.message}`);
        }
    }

    static async cancelSubscription(userId) {
        try {
            const subscription = await Subscription.getByUserId(userId);
            if (!subscription) {
                throw new Error('No active subscription found to cancel');
            }

            // Cancel the Stripe subscription
            await stripe.subscriptions.cancel(subscription.stripe_subscription_id);
            
            // Update local database
            return await Subscription.cancel(userId);
        } catch (error) {
            throw new Error(`Error cancelling subscription: ${error.message}`);
        }
    }

    static async handleWebhook(event) {
        try {
            switch (event.type) {
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object;
                    const userId = subscription.metadata.userId;
                    // Update subscription status in database
                    await Subscription.updateStatus(userId, subscription.status);
                    break;
            }
        } catch (error) {
            throw new Error(`Error handling webhook: ${error.message}`);
        }
    }

    static async handlePaymentSuccess(paymentIntent) {
        try {
            console.log('Handling payment success for:', paymentIntent.id);
            
            const subscription = await stripe.subscriptions.retrieve(
                paymentIntent.metadata.subscription_id
            );
            console.log('Retrieved subscription:', subscription.id);

            await pool.query(
                `UPDATE user_subscriptions 
                SET status = 'active', 
                    updated_at = CURRENT_TIMESTAMP 
                WHERE stripe_subscription_id = $1`,
                [subscription.id]
            );
            console.log('Updated subscription status to active');
        } catch (error) {
            console.error('Error in handlePaymentSuccess:', error);
            throw new Error(`Error handling payment success: ${error.message}`);
        }
    }

    static async handlePaymentFailure(paymentIntent) {
        try {
            console.log('Handling payment failure for:', paymentIntent.id);
            
            const subscription = await stripe.subscriptions.retrieve(
                paymentIntent.metadata.subscription_id
            );
            console.log('Retrieved subscription:', subscription.id);

            await pool.query(
                `UPDATE user_subscriptions 
                SET status = 'failed', 
                    updated_at = CURRENT_TIMESTAMP 
                WHERE stripe_subscription_id = $1`,
                [subscription.id]
            );
            console.log('Updated subscription status to failed');
        } catch (error) {
            console.error('Error in handlePaymentFailure:', error);
            throw new Error(`Error handling payment failure: ${error.message}`);
        }
    }

    static async handleSubscriptionCancelled(subscription) {
        try {
            await pool.query(
                `UPDATE user_subscriptions 
                SET status = 'cancelled', 
                    updated_at = CURRENT_TIMESTAMP 
                WHERE stripe_subscription_id = $1`,
                [subscription.id]
            );
        } catch (error) {
            throw new Error(`Error handling subscription cancellation: ${error.message}`);
        }
    }

    static async handleSubscriptionUpdated(subscription) {
        try {
            await pool.query(
                `UPDATE user_subscriptions 
                SET status = $1, 
                    updated_at = CURRENT_TIMESTAMP 
                WHERE stripe_subscription_id = $2`,
                [subscription.status, subscription.id]
            );
        } catch (error) {
            throw new Error(`Error handling subscription update: ${error.message}`);
        }
    }
}

module.exports = SubscriptionService; 