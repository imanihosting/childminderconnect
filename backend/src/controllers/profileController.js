const pool = require('../config/database');

class ProfileController {
    static async getProfile(req, res) {
        try {
            const userId = req.user.id;
            const userType = req.user.user_type;
            
            const query = userType === 'parent' 
                ? 'SELECT * FROM parent_profiles WHERE user_id = $1'
                : 'SELECT * FROM childminder_profiles WHERE user_id = $1';
            
            const { rows } = await pool.query(query, [userId]);
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Profile not found' });
            }
            
            res.json(rows[0]);
        } catch (error) {
            console.error('Error getting profile:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async updateProfile(req, res) {
        try {
            const userId = req.user.id;
            const userType = req.user.user_type;
            const profileData = req.body;

            const query = userType === 'parent'
                ? `UPDATE parent_profiles SET 
                    first_name = $1, last_name = $2, eircode = $3, 
                    phone_number = $4, children_count = $5, children_ages = $6
                    WHERE user_id = $7 RETURNING *`
                : `UPDATE childminder_profiles SET 
                    first_name = $1, last_name = $2, eircode = $3, 
                    phone_number = $4, hourly_rate = $5, max_children = $6,
                    availability = $7, preferred_languages = $8
                    WHERE user_id = $9 RETURNING *`;

            const values = userType === 'parent' 
                ? [
                    profileData.first_name,
                    profileData.last_name,
                    profileData.eircode,
                    profileData.phone_number,
                    profileData.children_count,
                    profileData.children_ages,
                    userId
                ]
                : [
                    profileData.first_name,
                    profileData.last_name,
                    profileData.eircode,
                    profileData.phone_number,
                    profileData.hourly_rate,
                    profileData.max_children,
                    profileData.availability,
                    profileData.preferred_languages,
                    userId
                ];

            const { rows } = await pool.query(query, values);
            res.json(rows[0]);
        } catch (error) {
            console.error('Error updating profile:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getChildminderProfile(req, res) {
        try {
            const { childminderId } = req.params;
            const query = 'SELECT * FROM childminder_profiles WHERE id = $1';
            const { rows } = await pool.query(query, [childminderId]);
            
            if (rows.length === 0) {
                return res.status(404).json({ error: 'Childminder profile not found' });
            }
            
            res.json(rows[0]);
        } catch (error) {
            console.error('Error getting childminder profile:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = ProfileController; 