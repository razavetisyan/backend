const UserModel = require("../models/user.model.js");
const { hashPassword, verifyPassword } = require("../utils/hash.js");
const { signToken } = require("../utils/token.js");
const { AppError } = require("../utils/AppError.js");
const { JWT_SECRET } = require("../config/env.js");
const { generateId } = require("../utils/id.js");

async function registerUser(data) {
  const exists = await UserModel.getUserByName(data.username);

  if (exists) {
    throw new AppError("User exists", 401);
  }

  const newUser = {
    id: generateId(),
    username: data.username,
    password: await hashPassword(data.password),
    createdAt: new Date().toISOString(),
  };

  const token = signToken({ username: data.username }, JWT_SECRET);

  await UserModel.createUser(newUser);

  return {
    user: newUser,
    token
  };
}

async function loginUser(data) {
  const user = await UserModel.getUserByName(data.username);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const isMatch = await verifyPassword(data.password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid password", 401);
  }

  const token = signToken({ username: data.username }, JWT_SECRET);

  return {
    user : user.username,
    token : token
  };
}

async function getProfile(name) {
  const user = await UserModel.getUserByName(name);

  const { password, ...safeUser } = user;

  return safeUser;
}

module.exports = {
  registerUser,
  loginUser,
  getProfile
};
