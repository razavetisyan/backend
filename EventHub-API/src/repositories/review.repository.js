const Review = require("../models/review.model.js");

function createReview(reviewData) {
    return Review.create(reviewData);
}

function findReviewById(reviewId) {
    return Review.findById(reviewId);
}

function findUserReview(userId, eventId) {
    return Review.findOne({
        user_id: userId,
        event_id: eventId,
    });
}

function findEventReviews(eventId) {
    return Review.find({ event_id: eventId })
        .populate("user_id", "name email")
        .sort({ createdAt: -1 });
}

function updateReview(reviewId, updateData) {
    return Review.findByIdAndUpdate(reviewId, updateData, {
        returnDocument: "after",
        runValidators: true,
    });
}

function deleteReview(reviewId) {
    return Review.findByIdAndDelete(reviewId);
}

module.exports = {
    createReview,
    deleteReview,
    updateReview,
    findReviewById,
    findUserReview,
    findEventReviews,
};
