const { pool } = require("../utils/db.js");

async function getAllBooks() {
  const res = await pool.query("SELECT * FROM books");

  return res.rows;
}

async function createBook(data) {
  const { title, author } = data;

  const res = await pool.query(
    "INSERT INTO books (title, author) VALUES ($1, $2) RETURNING *",
    [title, author],
  );

  return res.rows[0];
}

async function updateBook(id, updateData) {
  const { title, author } = updateData;

  const res = await pool.query(
    `UPDATE books
    SET title = COALESCE($1, title), 
    author = COALESCE($2, author)
    WHERE id = $3
    RETURNING *`,
    [title, author, id],
  );

  return res.rows[0] || null;
}

async function deleteBook(id) {
  const res = await pool.query("DELETE FROM books WHERE id = $1 RETURNING *", [
    id,
  ]);

  return res.rowCount > 0;
}

async function getBookById(id) {
  const res = await pool.query(
    "SELECT * FROM books WHERE id = $1",
    [id],
  );

  return res.rows[0];
}

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
};
