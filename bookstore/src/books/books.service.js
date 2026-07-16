const { pool } = require("../utils/db.js");

async function getAllBooks() {
  const res = await pool.query("SELECT * FROM books");

  return res.rows;
}

async function getBookById(id) {
  const res = await pool.query(
    `SELECT * FROM books WHERE id = $1 RETURNING *`,
    [id],
  );

  return res.rows[0];
}

async function createBook(data) {
  const { title, author_id, price, in_stock, published_date, created_at } =
    data;

  const res = await pool.query(
    `INSERT INTO books
        (title, author_id, price, in_stock, published_date, created_at)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
    [title, author_id, price, in_stock, published_date, created_at],
  );

  return res.rows[0];
}

async function updateBook(id, updatedBook) {
  const { title, author_id, price, in_stock, published_date, created_at } =
    updatedBook;

  const res = await pool.query(
    `UPDATE books
        SET title = $1,
        author_id = $2,
        price = $3,
        in_stock = $4,
        published_date = $5,
        created_at = $6
        WHERE id = $7
        RETURNING *`,
    [title, author_id, price, in_stock, published_date, created_at, id],
  );

  return res.rows[0];
}

async function deleteBook(id) {
  const res = await pool.query(
    `DELETE FROM books
        WHERE id = $1
        RETURNING *`,
    [id],
  );

  return res.rows[0];
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
