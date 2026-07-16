const User = require("../models/User");
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");

async function register({ name, email, password, role }) {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new AppError("Email already in use", 409);
  }

  const user = new User({ name, email, password, role });
  await user.save();

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      password: user.password,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30m" },
  );

  return {
    user,
    token,
  };
}

async function login({ email, password }) {
  const user = await User.findOne({ email });

  if (!user) throw new AppError("Invalid credentials", 401);

  const valid = await user.comparePassword(password);

  if (!valid) throw new AppError("Invalid password", 401);

  return user;
}

module.exports = { register, login };
