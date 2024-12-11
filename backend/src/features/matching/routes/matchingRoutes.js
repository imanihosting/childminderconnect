const express = require('express');
const router = express.Router();
const MatchingController = require('../controllers/matchingController');
const { matchValidation } = require('../../../middleware/validators');
const auth = require('../../../middleware/auth');

// Apply auth middleware to all matching routes
router.use(auth);

// Define routes
router.get('/matches', MatchingController.getMatches);
router.post('/match', matchValidation, MatchingController.createMatch);

module.exports = router; 