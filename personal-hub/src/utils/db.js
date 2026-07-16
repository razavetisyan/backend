const { Pool } = require("pg");

const pool = new Pool({
  user: "razavetisyan",
  password: "",
  host: "localhost",
  port: 5432,
  database: "books_db",
});

module.exports = { pool };
