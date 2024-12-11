const { body, validationResult } = require('express-validator');

// Validation middleware
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Auth validation rules
const registerValidation = [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('userType')
        .isIn(['parent', 'childminder'])
        .withMessage('User type must be either parent or childminder'),
    validate
];

// Profile validation rules
const profileValidation = [
    body('firstName').notEmpty().withMessage('First name is required'),
    body('lastName').notEmpty().withMessage('Last name is required'),
    body('phone').optional().isMobilePhone().withMessage('Please enter a valid phone number'),
    validate
];

// Match validation rules
const matchValidation = [
    body('childminder_id').isInt().withMessage('Valid childminder ID is required'),
    body('schedule_requirements').notEmpty().withMessage('Schedule requirements are required'),
    validate
];

// Subscription validation rules
const subscriptionValidation = [
    body('priceId').notEmpty().withMessage('Price ID is required'),
    validate
];

module.exports = {
    registerValidation,
    profileValidation,
    matchValidation,
    subscriptionValidation
}; 