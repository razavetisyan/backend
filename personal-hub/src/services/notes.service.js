const NotesModel = require("../models/note.model.js");
const UserModel = require("../models/user.model.js");
const { generateId } = require("../utils/id.js");
const { AppError } = require("../utils/AppError.js");

async function getAllNotes() {
  return await NotesModel.getAllNotes();
}

async function getNotesByOwnerId(username) {
  const user = await UserModel.getUserByName(username);
  const note = await NotesModel.getNotesByOwnerId(user.id);

  if (note.length === 0) {
    throw new AppError("Note not found", 404);
  }

  return note;
}

async function getNotesById(id, username) {
  const user = await UserModel.getUserByName(username)
  const note = await NotesModel.getNotesById(id);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  if(user.id !== note.ownerId) {
    throw new AppError("This is not your note", 403);
  }

  return note;
}

async function createNote(data, username) {
  const user = await UserModel.getUserByName(username);

  const newNote = {
    id: generateId(),
    ownerId: user.id,
    title: data.title,
    body: data.body,
    tags: data.tags,
    createdAt: new Date().toISOString(),
  };

  await NotesModel.createNote(newNote);

  return newNote;
}

async function updateNote(id, updatedNote) {
  const note = await getNotesById(id);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  const updated = await NotesModel.updateNote(id, updatedNote);

  return updated;
}

async function deleteNote(id) {
  const note = await NotesModel.getNotesById(id);

  if (!note) {
    throw new AppError("Note not found", 404);
  }

  await NotesModel.deleteNote(id);
}

module.exports = {
  getAllNotes,
  getNotesByOwnerId,
  getNotesById,
  createNote,
  updateNote,
  deleteNote,
};
