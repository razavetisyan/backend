const NotesService = require("../services/notes.service.js");

async function getAllNotes(req, res, next) {
  try {
    const notes = await NotesService.getAllNotes();

    res.status(200).json({
      message: "All notes",
      notes,
    });
  } catch (err) {
    next(err);
  }
}

async function getNotesByOwnerId(req, res, next) {
  try {
    const note = await NotesService.getNotesByOwnerId(req.user.username);

    res.status(200).json({
        note,
    });
  } catch (err) {
    next(err);
  }
}

async function getNotesById(req, res, next) {
    try {
        const { id } = req.params;

        const note = await NotesService.getNotesById(id, req.user.username);

        res.status(200).json({
            note
        });
    } catch (err) {
        next(err);
    }
}

async function createNote(req, res, next) {
    try {
        const note = await NotesService.createNote(req.body, req.user.username);

        res.status(201).json({
            message : "Created",
            note
        });
    } catch (err) {
        next(err);
    }
}

async function updateNote(req, res, next) {
    try {
        const { id } = req.body;

        const note = await NotesService.updateNote(id, req.body);

        res.status(200).json({
            message : "Updated",
            note
        });
    } catch (err) {
        next(err);
    }
}

async function deleteNote(req, res, next) {
    try {
        const { id } = req.body;

        const note = await NotesService.deleteNote(id);

        res.status(200).json({
            message : "Deleted",
            note
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllNotes,
    getNotesById,
    getNotesByOwnerId,
    createNote,
    updateNote,
    deleteNote
}