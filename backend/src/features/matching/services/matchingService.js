const pool = require('../../../config/database');

class MatchingService {
    static async findMatchesForParent(parentId) {
        const query = `
            SELECT 
                cp.id as profile_id,
                cp.user_id,
                cp.first_name,
                cp.last_name,
                cp.eircode,
                cp.hourly_rate,
                cp.availability,
                cp.max_children,
                cp.preferred_languages,
                cp.experience_years,
                cp.garda_vetted
            FROM childminder_profiles cp
            JOIN users u ON cp.user_id = u.id
            WHERE u.user_type = 'childminder'
            AND cp.max_children > 0
            AND cp.garda_vetted = true;
        `;

        const { rows } = await pool.query(query);
        return rows;
    }

    static async createMatch(parentId, childminderId, requirements) {
        const query = `
            INSERT INTO matches 
            (parent_id, childminder_id, status, schedule_requirements, additional_requirements)
            VALUES ($1, $2, 'pending', $3, $4)
            RETURNING *;
        `;

        const values = [
            parentId,
            childminderId,
            requirements.schedule_requirements,
            requirements.additional_requirements
        ];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = MatchingService; 