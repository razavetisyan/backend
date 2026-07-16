const router = require("express").Router();
const reviewController = require("../controllers/review.controller.js");

const asyncHandler = require("../utils/asyncHandler.js");
const validate = require("../middlewares/validate.middleware.js");
const authenticate = require("../middlewares/auth.middleware.js");

const { createReviewSchema, updateReviewSchema } = require("../validators/review.validator.js");

router.get("/:reviewId", authenticate, asyncHandler(reviewController.getReviewById));

router.patch(
    "/:reviewId",
    authenticate,
    validate(updateReviewSchema),
    asyncHandler(reviewController.updateReview)
);

router.delete("/:reviewId", authenticate, asyncHandler(reviewController.deleteReview));

module.exports = router;
