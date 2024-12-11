const User = require('../models/User');
const ParentProfile = require('../models/ParentProfile');
const ChildminderProfile = require('../models/ChildminderProfile');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserController {
  static async register(req, res) {
    try {
      const { email, password, user_type, profile_data } = req.body;

      // Create user
      const user = await User.create({ email, password, user_type });

      // Create corresponding profile
      if (user_type === 'parent') {
        await ParentProfile.create({ user_id: user.id, ...profile_data });
      } else {
        await ChildminderProfile.create({ user_id: user.id, ...profile_data });
      }

      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, user_type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.status(201).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, user_type: user.user_type },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Remove sensitive data before sending response
      const safeUser = {
        id: user.id,
        email: user.email,
        user_type: user.user_type,
        created_at: user.created_at
      };

      res.json({ user: safeUser, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = UserController; 