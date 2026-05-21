const router = require("express").Router();

const authRoutes = require("./auth.routes.js");
const notesRoutes = require("./notes.routes.js");
const booksRoutes = require("./books.routes.js");
const habitsRoutes = require("./habits.routes.js");

router.use("/auth", authRoutes);
router.use("/notes", notesRoutes);
router.use("/books", booksRoutes);
router.use("/habits", habitsRoutes);

module.exports = router;
