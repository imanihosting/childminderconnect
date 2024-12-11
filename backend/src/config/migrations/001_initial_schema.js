const { Pool } = require('pg');
const pool = require('../database');

async function createInitialSchema() {
  try {
    await pool.query(`
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('parent', 'childminder')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Parent profiles
      CREATE TABLE IF NOT EXISTS parent_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        address TEXT,
        eircode VARCHAR(20),
        phone_number VARCHAR(20),
        children_count INTEGER,
        children_ages INTEGER[],
        schedule_requirements TEXT,
        additional_requirements TEXT
      );

      -- Childminder profiles
      CREATE TABLE IF NOT EXISTS childminder_profiles (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        first_name VARCHAR(100) NOT NULL,
        last_name VARCHAR(100) NOT NULL,
        address TEXT,
        eircode VARCHAR(20),
        phone_number VARCHAR(20),
        experience_years INTEGER,
        qualifications TEXT[],
        garda_vetted BOOLEAN DEFAULT FALSE,
        availability TEXT,
        max_children INTEGER,
        hourly_rate DECIMAL(10,2),
        preferred_languages TEXT[]
      );

      -- Subscription plans
      CREATE TABLE IF NOT EXISTS subscription_plans (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price DECIMAL(10,2) NOT NULL,
        currency VARCHAR(10) DEFAULT 'EUR',
        duration_months INTEGER NOT NULL,
        features TEXT[]
      );

      -- User subscriptions
      CREATE TABLE IF NOT EXISTS user_subscriptions (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        plan_id INTEGER REFERENCES subscription_plans(id) ON DELETE CASCADE,
        start_date TIMESTAMP NOT NULL,
        end_date TIMESTAMP NOT NULL,
        status VARCHAR(20) CHECK (status IN ('active', 'cancelled', 'expired')),
        stripe_subscription_id VARCHAR(255)
      );

      -- Matches
      CREATE TABLE IF NOT EXISTS matches (
        id SERIAL PRIMARY KEY,
        parent_id INTEGER REFERENCES parent_profiles(id) ON DELETE CASCADE,
        childminder_id INTEGER REFERENCES childminder_profiles(id) ON DELETE CASCADE,
        match_score DECIMAL(5,2),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Insert default subscription plans
    await pool.query(`
      INSERT INTO subscription_plans (name, price, currency, duration_months, features)
      VALUES 
        ('Monthly Plan', 4.99, 'EUR', 1, ARRAY['Profile Creation', 'Unlimited Matching', 'Message Support']),
        ('Yearly Plan', 49.99, 'EUR', 12, ARRAY['Profile Creation', 'Unlimited Matching', 'Message Support', '2 Months Free'])
      ON CONFLICT DO NOTHING;
    `);

    console.log('Initial schema created successfully');
  } catch (error) {
    console.error('Error creating initial schema:', error);
    throw error;
  }
}

// Function to drop all tables (useful for testing)
async function dropAllTables() {
  try {
    await pool.query(`
      DROP TABLE IF EXISTS matches CASCADE;
      DROP TABLE IF EXISTS user_subscriptions CASCADE;
      DROP TABLE IF EXISTS subscription_plans CASCADE;
      DROP TABLE IF EXISTS childminder_profiles CASCADE;
      DROP TABLE IF EXISTS parent_profiles CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log('All tables dropped successfully');
  } catch (error) {
    console.error('Error dropping tables:', error);
    throw error;
  }
}

module.exports = {
  createInitialSchema,
  dropAllTables
}; 