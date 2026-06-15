const router = require("express").Router();

const ReviewController = require("../controllers/review.controller.js");

const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/products/:id/reviews", ReviewController.getProductReview);
router.post(
  "/products/:id/reviews",
  authMiddleware,
  ReviewController.createReview,
);
router.delete(
  "/reviews/:id",
  authMiddleware,
  ReviewController.deleteReview,
);

module.exports = router;
