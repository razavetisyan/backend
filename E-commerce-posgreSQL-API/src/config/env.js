require("dotenv").config({ quiet: true });

module.exports = {
  PORT: process.env.PORT,
  HOST: process.env.HOST,
  JWT_SECRET: process.env.JWT_SECRET,
  DB_URL: process.env.DB_URL,
};