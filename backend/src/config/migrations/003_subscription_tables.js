const pool = require('../database');

async function createSubscriptionTables() {
    try {
        // First, drop existing tables if they exist
        await pool.query(`
            DROP TABLE IF EXISTS user_subscriptions CASCADE;
            DROP TABLE IF EXISTS subscription_plans CASCADE;
        `);

        // Create subscription_plans table
        await pool.query(`
            CREATE TABLE subscription_plans (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                stripe_price_id VARCHAR(100) NOT NULL,
                price DECIMAL(10,2) NOT NULL,
                currency VARCHAR(10) DEFAULT 'EUR',
                duration_months INTEGER NOT NULL,
                features TEXT[]
            );
        `);

        // Create user_subscriptions table
        await pool.query(`
            CREATE TABLE user_subscriptions (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                plan_id INTEGER REFERENCES subscription_plans(id),
                stripe_subscription_id VARCHAR(100),
                status VARCHAR(20) DEFAULT 'pending',
                start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                end_date TIMESTAMP,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        // Insert default plans
        await pool.query(`
            INSERT INTO subscription_plans 
                (name, stripe_price_id, price, duration_months, features)
            VALUES 
                ('Monthly Plan', 'price_1QQ61DE8w0VgApNuoRjufjA4', 4.99, 1, 
                    ARRAY['Profile Creation', 'Unlimited Matching', 'Message Support']),
                ('Yearly Plan', 'price_1QQ62DE8w0VgApNuoRjufjA4', 49.99, 12, 
                    ARRAY['Profile Creation', 'Unlimited Matching', 'Message Support', '2 Months Free']);
        `);

        console.log('Subscription tables created successfully');
    } catch (error) {
        console.error('Error creating subscription tables:', error);
        throw error;
    }
}

module.exports = {
    createSubscriptionTables
}; 