const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware.js");
const CartController = require("../controllers/cart.controller.js");

router.get("/", authMiddleware, CartController.getCart);
router.post("/item", authMiddleware, CartController.addItem);
router.put("/item/:id", authMiddleware, CartController.updateItem);
router.delete("/item/:id", authMiddleware, CartController.deleteItem);

module.exports = router;
