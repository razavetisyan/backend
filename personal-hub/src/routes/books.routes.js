const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validateBook } = require("../middlewares/validate.middleware.js");

const BookController = require("../controllers/books.controller.js");

router.get("/", authMiddleware, BookController.getAllBooks);
router.get("/:id", authMiddleware, BookController.getBookById);
router.post("/", authMiddleware, validateBook, BookController.createBook);
router.patch("/:id", authMiddleware, validateBook, BookController.updateBook);
router.delete("/:id", authMiddleware, BookController.deleteBook);

module.exports = router;