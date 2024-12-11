const validateRegistration = (req, res, next) => {
  const { email, password, user_type } = req.body;

  if (!email || !password || !user_type) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!['parent', 'childminder'].includes(user_type)) {
    return res.status(400).json({ error: 'Invalid user type' });
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Password validation (at least 8 characters, 1 uppercase, 1 lowercase, 1 number)
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({ 
      error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number' 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  next();
};

const validateProfileUpdate = (req, res, next) => {
  const { phone_number } = req.body;

  if (phone_number) {
    // Irish phone number validation (very basic)
    const phoneRegex = /^(\+353|0)[1-9]\d{8}$/;
    if (!phoneRegex.test(phone_number)) {
      return res.status(400).json({ error: 'Invalid Irish phone number format' });
    }
  }

  next();
};

const validateSubscription = (req, res, next) => {
  const { plan_type, payment_method_id } = req.body;

  if (!plan_type || !payment_method_id) {
    return res.status(400).json({ error: 'Plan type and payment method are required' });
  }

  if (!['monthly', 'yearly'].includes(plan_type)) {
    return res.status(400).json({ error: 'Invalid plan type' });
  }

  next();
};

module.exports = {
  validateRegistration,
  validateLogin,
  validateProfileUpdate,
  validateSubscription
}; 