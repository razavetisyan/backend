const reviewService = require("../services/review.service.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");

async function createReview(req, res) {
    const { eventId } = req.params;
    const { id } = req.user;
    const reviewData = req.body;

    const review = await reviewService.createReview(id, eventId, reviewData);

    return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Review created successfully",
        data: review,
    });
}

async function getEventReviews(req, res) {
    const { eventId } = req.params;
    const reviews = await reviewService.getEventReviews(eventId);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Reviews fetched successfully",
        data: reviews,
    });
}

async function getReviewById(req, res) {
    const { reviewId } = req.params;
    const review = await reviewService.getReviewById(reviewId);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Review fetched successfully",
        data: review,
    });
}

async function updateReview(req, res) {
    const { reviewId } = req.params;
    const { id } = req.user;
    const updateData = req.body;

    const updatedReview = await reviewService.updateReview(id, reviewId, updateData);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Review updated successfully",
        data: updatedReview,
    });
}

async function deleteReview(req, res) {
    const { reviewId } = req.params;
    const { id } = req.user;
    await reviewService.deleteReview(id, reviewId);

    res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Review successfully deleted",
    });
}

module.exports = {
    createReview,
    getEventReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
