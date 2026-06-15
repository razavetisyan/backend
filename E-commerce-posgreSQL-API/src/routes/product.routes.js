const router = require("express").Router();

const ProductController = require("../controllers/product.controller.js");
const adminMiddleware = require("../middlewares/admin.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.post("/", authMiddleware, adminMiddleware, ProductController.createProduct);
router.put("/:id", authMiddleware,adminMiddleware, ProductController.updateProduct);
router.delete("/:id", authMiddleware ,adminMiddleware, ProductController.deleteProduct);

module.exports = router;