const request = require('supertest');
const app = require('../app');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

describe('Subscription Tests', () => {
  let authToken;
  let testPaymentMethod;

  beforeAll(async () => {
    // Login to get token
    const loginResponse = await request(app)
      .post('/auth/login')
      .send({
        email: 'parent@test.com',
        password: 'Password123!'
      });
    authToken = loginResponse.body.token;

    // Create test payment method
    testPaymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        number: '4242424242424242',
        exp_month: 12,
        exp_year: 2024,
        cvc: '123',
      },
    });
  });

  describe('POST /subscriptions/create', () => {
    it('should create a monthly subscription', async () => {
      const response = await request(app)
        .post('/subscriptions/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          plan_type: 'monthly',
          payment_method_id: testPaymentMethod.id
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('subscriptionId');
      expect(response.body).toHaveProperty('clientSecret');
      expect(response.body.subscription).toHaveProperty('status', 'active');
    });

    it('should create a yearly subscription', async () => {
      const response = await request(app)
        .post('/subscriptions/create')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          plan_type: 'yearly',
          payment_method_id: testPaymentMethod.id
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('subscriptionId');
      expect(response.body).toHaveProperty('clientSecret');
      expect(response.body.subscription).toHaveProperty('status', 'active');
    });
  });

  describe('GET /subscriptions/status', () => {
    it('should return active subscription status', async () => {
      const response = await request(app)
        .get('/subscriptions/status')
        .set('Authorization', `Bearer ${authToken}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'active');
    });
  });
}); 