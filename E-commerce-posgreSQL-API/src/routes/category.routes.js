const router = require("express").Router();

const CategoryController = require("../controllers/category.controller.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const adminMiddleware = require("../middlewares/admin.middleware.js");

router.get("/", CategoryController.getAllCategories);
router.post("/", authMiddleware, adminMiddleware, CategoryController.createCategory);
router.delete("/:id", authMiddleware, adminMiddleware, CategoryController.deleteCategory);

module.exports = router;
