const authService = require('../services/auth.service');

async function register(req, res) {
  const { name, email, password, role } = req.body;
  // Validated

  const user = await authService.register({ name, email, password, role });
  res.status(201).json(user);
}

async function login(req, res) {
  const { email, password } = req.body;
  const user = await authService.login({ email, password });
  res.json({
    message: 'Logged in',
    userId: user._id,
    rolde: user.role,
  });
}

module.exports = { register, login };
