const MatchingService = require('../services/matchingService');

class MatchingController {
    static async getMatches(req, res) {
        try {
            const matches = await MatchingService.findMatchesForParent(req.user.id);
            res.json(matches);
        } catch (error) {
            console.error('Error finding matches:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async createMatch(req, res) {
        try {
            const { childminder_id, schedule_requirements, additional_requirements } = req.body;
            const match = await MatchingService.createMatch(
                req.user.id,
                childminder_id,
                { schedule_requirements, additional_requirements }
            );
            res.json(match);
        } catch (error) {
            console.error('Error creating match:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = MatchingController; 