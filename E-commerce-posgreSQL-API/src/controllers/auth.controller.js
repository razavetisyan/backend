const authService = require("../services/auth.service.js");

async function register(req, res, next) {
  try {
    const register = await authService.register(req.body);

    res.status(201).json({
      message: "Registered",
      register,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const login = await authService.login(req.body);

    res.status(200).json({
      message: "Login success",
      login,
    });
  } catch (err) {
    next(err);
  }
}

async function me(req, res, next) {
  try {
    const user = await authService.me(req.user.id);

    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  register,
  login,
  me,
};
