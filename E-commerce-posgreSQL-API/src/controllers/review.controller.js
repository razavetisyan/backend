const ReviewService = require("../services/review.service.js");

async function getProductReview(req, res, next) {
  try {
    const review = await ReviewService.getProductReview(req.params.id);

    res.status(200).json({
      message: "Review",
      review,
    });
  } catch (err) {
    next(err);
  }
}

async function createReview(req, res, next) {
  try {
    const review = await ReviewService.createReview(
      req.user.id,
      req.params.id,
      req.body,
    );

    res.status(201).json({
      message: "Created",
      review,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteReview(req, res, next) {
    try {
        const review = await ReviewService.deleteReview(req.params.id, req.user);

        res.status(200).json({
            message : "Deleted",
            review
        });
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getProductReview,
    createReview,
    deleteReview
}