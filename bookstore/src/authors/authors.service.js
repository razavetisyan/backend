const { pool } = require("../utils/db.js");

async function getAllAuthors() {
  const res = await pool.query("SELECT * FROM authors");

  return res.rows;
}

async function getaAuthorById(id) {
  const res = await pool.query("SELECT * FROM authors WHERE id = $1", [id]);

  return res.rows[0];
}

async function createAuthor(data) {
  const { name, birth_year, country } = data;

  const res = await pool.query(
    `INSERT INTO authors (name, birth_year, country)
        VALUES ($1, $2, $3) RETURNING *`,
    [name, birth_year, country],
  );

  return res.rows[0];
}

async function updateAuthor(id, updatedAuthor) {
  const { name, birth_year, country } = updatedAuthor;

  const res = await pool.query(
    `UPDATE authors
        SET name = $1,
        birth_year = $2,
        country = $3
        WHERE id = $4
        RETURNING *`,
    [name, birth_year, country, id],
  );

  return res.rows[0];
}

async function deleteAuthor(id) {
  const res = await pool.query(
    `DELETE FROM authors 
        WHERE id = $1 
        RETURNING *`,
    [id],
  );

  return res.rows[0];
}

module.exports = {
  getAllAuthors,
  getaAuthorById,
  createAuthor,
  updateAuthor,
  deleteAuthor,
};
