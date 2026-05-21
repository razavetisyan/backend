const bcrypt = require("bcrypt");
const { AppError } = require("../utils/AppError.js");

async function hashPassword(password) {
  const hashedPassword = await bcrypt.hash(password, 10);

  return hashedPassword;
}

async function verifyPassword(password, hashedPassword) {
  try {
    const comparedPassword = await bcrypt.compare(password, hashedPassword);

    return comparedPassword;
  } catch (err) {
    throw new AppError("Invalid password", 401);
  }
}

module.exports = {
  hashPassword,
  verifyPassword
};
