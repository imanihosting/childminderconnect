const express = require('express');
const router = express.Router();
const ProfileController = require('../controllers/profileController');
const { profileValidation } = require('../middleware/validators');
const auth = require('../middleware/auth');

router.use(auth);
router.put('/update', profileValidation, ProfileController.updateProfile);
router.get('/status', ProfileController.getProfile);

module.exports = router; 