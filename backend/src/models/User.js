const pool = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
  static async create({ email, password, user_type }) {
    const password_hash = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (email, password_hash, user_type)
      VALUES ($1, $2, $3)
      RETURNING id, email, user_type, created_at;
    `;

    const { rows } = await pool.query(query, [email, password_hash, user_type]);
    return rows[0];
  }

  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const { rows } = await pool.query(query, [email]);
    return rows[0];
  }

  static async findById(id) {
    const query = 'SELECT id, email, user_type, created_at FROM users WHERE id = $1';
    const { rows } = await pool.query(query, [id]);
    return rows[0];
  }
}

module.exports = User; 