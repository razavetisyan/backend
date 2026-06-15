const env = require("../src/config/env.js");

module.exports = {
  development: {
    url: env.DB_URL,
    dialect: "postgres",
  },

  test: {
    url: env.DB_URL,
    dialect: "postgres",
  },

  production: {
    url: env.DB_URL,
    dialect: "postgres",
  },
};
