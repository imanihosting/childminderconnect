const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, userType } = req.body;

            // Check if user already exists
            const userExists = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (userExists.rows.length > 0) {
                return res.status(400).json({ error: 'User already exists' });
            }

            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            // Create user
            const result = await pool.query(
                'INSERT INTO users (email, password, user_type) VALUES ($1, $2, $3) RETURNING id, email, user_type',
                [email, hashedPassword, userType]
            );

            // Create corresponding profile
            const profileQuery = userType === 'parent'
                ? 'INSERT INTO parent_profiles (user_id) VALUES ($1)'
                : 'INSERT INTO childminder_profiles (user_id) VALUES ($1)';
            
            await pool.query(profileQuery, [result.rows[0].id]);

            // Generate JWT
            const token = jwt.sign(
                { id: result.rows[0].id, email, userType },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.status(201).json({
                token,
                user: {
                    id: result.rows[0].id,
                    email: result.rows[0].email,
                    userType: result.rows[0].user_type
                }
            });
        } catch (error) {
            console.error('Registration error:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            // Check if user exists
            const result = await pool.query(
                'SELECT * FROM users WHERE email = $1',
                [email]
            );

            if (result.rows.length === 0) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const user = result.rows[0];

            // Verify password
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: user.id, email: user.email, userType: user.user_type },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    userType: user.user_type
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = AuthController; 