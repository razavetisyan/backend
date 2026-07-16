const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validatePost } = require("../middlewares/validate.middleware.js");

const NotesController = require("../controllers/notes.controller.js");

router.get("/", NotesController.getNotesByOwnerId);
router.get("/:id", NotesController.getNotesById);
router.post("/", NotesController.createNote);
router.patch("/:id",  NotesController.updateNote);
router.delete("/:id",  NotesController.deleteNote);

module.exports = router;