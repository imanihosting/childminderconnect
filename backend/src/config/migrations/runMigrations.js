const pool = require('../database');
const { createInitialSchema } = require('./001_initial_schema');
const { createMatchesTable } = require('./002_matches_table');
const { createSubscriptionTables } = require('./003_subscription_tables');

async function runMigrations() {
    try {
        await createInitialSchema();
        await createMatchesTable();
        await createSubscriptionTables();
        console.log('All migrations completed successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
    } finally {
        await pool.end();
    }
}

runMigrations();

module.exports = runMigrations;