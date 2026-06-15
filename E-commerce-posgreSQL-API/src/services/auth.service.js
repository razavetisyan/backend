const { User } = require("../../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

async function register(data) {
  const { name, email, password , role } = data;

  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role
  });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: "20m" },
  );

  return {
    user,
    token,
  };
}

async function login(data) {
  const { email, password } = data;

  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMath = await bcrypt.compare(password, user.password);

  if (!isMath) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  return {
    user,
    token,
  };
}

async function me(userId) {
  const user = User.findByPk(userId, {
    attributes: {
      exclude: ["password"],
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}

module.exports = {
  register,
  login,
  me,
};
