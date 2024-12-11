const request = require('supertest');
const app = require('../app');
const pool = require('../config/database');

describe('Authentication Tests', () => {
  beforeAll(async () => {
    // Clear test database
    await pool.query('DELETE FROM users');
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /auth/register', () => {
    it('should register a new parent user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'parent@test.com',
          password: 'Password123!',
          user_type: 'parent',
          profile_data: {
            first_name: 'John',
            last_name: 'Doe',
            eircode: 'D01 F5P2',
            phone_number: '0871234567',
            children_count: 2,
            children_ages: [3, 5]
          }
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'parent@test.com');
    });

    it('should register a new childminder user', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'childminder@test.com',
          password: 'Password123!',
          user_type: 'childminder',
          profile_data: {
            first_name: 'Jane',
            last_name: 'Smith',
            eircode: 'D02 AF98',
            phone_number: '0877654321',
            experience_years: 5,
            garda_vetted: true,
            hourly_rate: 15.50
          }
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'childminder@test.com');
    });
  });

  describe('POST /auth/login', () => {
    it('should login existing user', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'parent@test.com',
          password: 'Password123!'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'parent@test.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
    });
  });
}); 