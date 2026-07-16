const { pool } = require("../utils/db.js");

async function getAllUsers() {
  const res = await pool.query('SELECT * FROM users');

  return res.rows;
}

async function createUser(user) {
  const { username, password } = user;

  const res = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
    [username, password]
  );

  return res.rows[0];
}

async function getUserByName(username) {
  const res = await pool.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );

  return res.rows[0];
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByName,
};
