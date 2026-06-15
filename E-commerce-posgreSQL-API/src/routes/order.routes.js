const router = require("express").Router();

const OrderController = require("../controllers/order.controller.js");

const adminMiddleware = require("../middlewares/admin.middleware.js");
const authMiddleware = require("../middlewares/auth.middleware.js");

router.post("/checkout", authMiddleware, OrderController.checkout);
router.get("/", authMiddleware, adminMiddleware, OrderController.getOrders);
router.get("/:id", authMiddleware, OrderController.getOrderById);
router.patch(
  "/:id/status",
  authMiddleware,
  adminMiddleware,
  OrderController.updateStatus,
);

module.exports = router;
