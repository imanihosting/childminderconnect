const pool = require('../../../config/database');

class Subscription {
    static async create(userId, planId) {
        const query = `
            INSERT INTO user_subscriptions (user_id, plan_id, status, start_date, end_date)
            VALUES ($1, $2, 'active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP + INTERVAL '1 month')
            RETURNING *
        `;
        const { rows } = await pool.query(query, [userId, planId]);
        return rows[0];
    }

    static async getByUserId(userId) {
        const query = `
            SELECT us.*, sp.name as plan_name, sp.price, sp.features
            FROM user_subscriptions us
            JOIN subscription_plans sp ON us.plan_id = sp.id
            WHERE us.user_id = $1 AND us.status = 'active'
            ORDER BY us.created_at DESC
            LIMIT 1
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows[0];
    }

    static async cancel(userId) {
        const query = `
            UPDATE user_subscriptions
            SET status = 'cancelled'
            WHERE user_id = $1 AND status = 'active'
            RETURNING *
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows[0];
    }
}

module.exports = Subscription; 