const { pool } = require("../utils/db.js");

async function getAllNotes() {
  const res = await pool.query("SELECT * FROM notes");

  return res.rows;
}

async function getNotesByOwnerId(ownerId) {
  const res = await pool.query("SELECT * FROM notes WHERE owner_id = $1", [
    ownerId,
  ]);

  return res.rows;
}

async function getNotesById(id) {
  const res = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);

  return res.rows[0] || null;
}

async function createNote(note) {
  const { title, body, tags } = note;

  const res = await pool.query(
    "INSERT INTO notes (title, body, tags) VALUES ($1, $2, $3) RETURNING *",
    [title, body, tags],
  );

  return res.rows[0];
}

async function updateNote(id, updatedNote) {
  const { title, body, tags } = updatedNote;

  const res = await pool.query(
    `UPDATE notes
    SET title = COALESCE($1, title), 
    body = COALESCE($2, body),
    tags = COALESCE($3, tags)
    WHERE id = $4
    RETURNING *`,
    [title, body, tags, id],
  );

  return res.rows[0] || null;
}

async function deleteNote(id) {
  const res = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [
    id,
  ]);

  return res.rowCount > 0;
}

module.exports = {
  getAllNotes,
  getNotesById,
  getNotesByOwnerId,
  createNote,
  deleteNote,
  updateNote,
};
