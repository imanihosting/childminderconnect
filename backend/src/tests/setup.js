const pool = require('../config/database');

beforeAll(async () => {
  // Wait for database connection
  await new Promise(resolve => setTimeout(resolve, 1000));
});

afterAll(async () => {
  await pool.end();
}); 