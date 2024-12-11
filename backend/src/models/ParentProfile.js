const pool = require('../config/database');

class ParentProfile {
  static async create({ user_id, first_name, last_name, address, eircode, phone_number, children_count, children_ages, schedule_requirements, additional_requirements }) {
    const query = `
      INSERT INTO parent_profiles 
      (user_id, first_name, last_name, address, eircode, phone_number, children_count, children_ages, schedule_requirements, additional_requirements)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const values = [user_id, first_name, last_name, address, eircode, phone_number, children_count, children_ages, schedule_requirements, additional_requirements];
    const { rows } = await pool.query(query, values);
    return rows[0];
  }

  static async findByUserId(user_id) {
    const query = 'SELECT * FROM parent_profiles WHERE user_id = $1';
    const { rows } = await pool.query(query, [user_id]);
    return rows[0];
  }

  static async update(id, updateData) {
    const keys = Object.keys(updateData);
    const values = Object.values(updateData);
    
    const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');
    const query = `
      UPDATE parent_profiles 
      SET ${setClause}
      WHERE id = $1
      RETURNING *;
    `;

    const { rows } = await pool.query(query, [id, ...values]);
    return rows[0];
  }
}

module.exports = ParentProfile; 