const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validatePost } = require("../middlewares/validate.middleware.js");

const NotesController = require("../controllers/notes.controller.js");

router.get("/", authMiddleware, NotesController.getNotesByOwnerId);
router.get("/:id", authMiddleware, NotesController.getNotesById);
router.post("/", authMiddleware, validatePost, NotesController.createNote);
router.patch("/:id", authMiddleware, validatePost, NotesController.updateNote);
router.delete("/:id", authMiddleware, NotesController.deleteNote);

module.exports = router;