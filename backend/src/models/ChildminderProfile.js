const pool = require('../config/database');

class ChildminderProfile {
  static async create({ user_id, first_name, last_name, address, eircode, phone_number, experience_years, qualifications, garda_vetted, availability, max_children, hourly_rate, preferred_languages }) {
    const query = `
      INSERT INTO childminder_profiles 
      (user_id, first_name, last_name, address, eircode, phone_number, experience_years, qualifications, garda_vetted, availability, max_children, hourly_rate, preferred_languages)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *;
    `;

    const values = [user_id, first_name, last_name, address, eircode, phone_number, experience_years, qualifications, garda_vetted, availability, max_children, hourly_rate, preferred_languages];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUserId(user_id) {
    const query = 'SELECT * FROM childminder_profiles WHERE user_id = $1';
    const { rows } = await pool.query(query, [user_id]);
    return rows[0];
  }

  static async update(userId, updateData) {
    const keys = Object.keys(updateData);
    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
    
    const query = `
      UPDATE childminder_profiles 
      SET ${setClause}
      WHERE user_id = $1
      RETURNING *;
    `;

    const values = [userId, ...keys.map(key => updateData[key])];
    console.log('Update query:', query, 'values:', values);

    const { rows } = await pool.query(query, values);
    return rows[0];
  }
}

module.exports = ChildminderProfile; 