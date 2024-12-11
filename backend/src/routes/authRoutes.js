const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');
const { body } = require('express-validator');

router.post('/register', [
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
    body('userType').isIn(['parent', 'childminder'])
], AuthController.register);

router.post('/login', [
    body('email').isEmail(),
    body('password').notEmpty()
], AuthController.login);

module.exports = router; 