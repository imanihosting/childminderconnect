const request = require('supertest');
const app = require('../app');
const pool = require('../config/database');
let authToken;

describe('Profile Tests', () => {
  beforeAll(async () => {
    // Login to get token
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'parent@test.com',
        password: 'Password123!'
      });
    authToken = response.body.token;
  });

  describe('GET /profile', () => {
    it('should get user profile', async () => {
      const response = await request(app)
        .get('/profile')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('first_name', 'John');
    });
  });

  describe('PUT /profile', () => {
    it('should update user profile', async () => {
      const response = await request(app)
        .put('/profile')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          phone_number: '0879876543',
          children_count: 3,
          children_ages: [3, 5, 7]
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('phone_number', '0879876543');
      expect(response.body.children_count).toBe(3);
    });
  });
}); 