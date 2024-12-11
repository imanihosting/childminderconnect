const pool = require('../database');

async function createMatchesTable() {
    try {
        // First drop the existing matches table
        await pool.query(`DROP TABLE IF EXISTS matches CASCADE;`);

        // Create the new matches table with the correct structure
        await pool.query(`
            CREATE TABLE IF NOT EXISTS matches (
                id SERIAL PRIMARY KEY,
                parent_id INTEGER REFERENCES users(id),
                childminder_id INTEGER REFERENCES childminder_profiles(id),
                status VARCHAR(20) NOT NULL DEFAULT 'pending',
                schedule_requirements TEXT,
                additional_requirements TEXT,
                match_score DECIMAL(5,2),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Matches table recreated successfully');
    } catch (error) {
        console.error('Error recreating matches table:', error);
        throw error;
    }
}

module.exports = {
    createMatchesTable
}; 