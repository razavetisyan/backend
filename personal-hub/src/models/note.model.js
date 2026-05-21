const { readJson, writeJson } = require("../utils/fileDb.js");
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "../../data/notes.json");

async function getAllNotes() {
  const notes = await readJson(FILE_PATH);

  return notes;
}

async function getNotesByOwnerId(ownerId) {
  const notes = await getAllNotes();

  const note = notes.filter((a) => a.ownerId === ownerId);

  return note;
}

async function getNotesById(id) {
  const notes = await getAllNotes();

  const note = notes.find((a) => a.id === id);

  return note;
}

async function createNote(note) {
  const notes = await getAllNotes();

  notes.push(note);

  await writeJson(FILE_PATH, notes);
}

async function updateNote(id, updatedNote) {
  const notes = await getAllNotes();

  const index = notes.findIndex((a) => a.id === id);

  if (index === -1) {
    return null;
  }

  Object.assign(notes[index], updatedNote);

  notes[index].updatedAt = new Date().toISOString();

  await writeJson(FILE_PATH, notes);

  return notes[index];
}

async function deleteNote(id) {
  const notes = await getAllNotes();

  const filtered = notes.filter((a) => a.id !== id);

  if (notes.length === filtered.length) {
    return false;
  }

  await writeJson(FILE_PATH, filtered);

  return true;
}

module.exports = {
  getAllNotes,
  getNotesById,
  getNotesByOwnerId,
  createNote,
  deleteNote,
  updateNote,
};
