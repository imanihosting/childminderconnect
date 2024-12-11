const { createInitialSchema } = require('../config/migrations/001_initial_schema');

async function runMigrations() {
  try {
    await createInitialSchema();
    console.log('Migrations completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigrations(); 