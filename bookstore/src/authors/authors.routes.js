const router = require("express").Router();

const authorController = require("./authors.controller.js");

router.get("/", authorController.getAllAuthors);
router.get("/:id", authorController.getaAuthorById);
router.post("/", authorController.createAuthor);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

module.exports = router;