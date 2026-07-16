const reviewRepo = require("../repositories/review.repository.js");
const eventRepo = require("../repositories/event.repository.js");

const AppError = require("../utils/AppError.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

async function createReview(userId, eventId, reviewData) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    const isAttendee = await eventRepo.findAttendance(userId, eventId);

    if (!isAttendee) {
        throw new AppError(
            "Only event attendees can review",
            HTTP_STATUS.FORBIDDEN,
            ERROR_CODES.NOT_ATTENDEE
        );
    }

    const existingReview = await reviewRepo.findUserReview(userId, eventId);

    if (existingReview) {
        throw new AppError(
            "You already reviewed this event",
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.REVIEW_EXISTS
        );
    }

    const review = await reviewRepo.createReview({
        user_id: userId,
        event_id: eventId,
        ...reviewData,
    });

    return review;
}

async function getReviewById(reviewId) {
    const review = await reviewRepo.findReviewById(reviewId);

    if (!review) {
        throw new AppError("Review not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.REVIEW_NOT_FOUND);
    }

    return review;
}

async function getEventReviews(eventId) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    const reviews = await reviewRepo.findEventReviews(eventId);

    return reviews;
}

async function updateReview(userId, reviewId, updateData) {
    const review = await reviewRepo.findReviewById(reviewId);

    if (!review) {
        throw new AppError("Review not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.REVIEW_NOT_FOUND);
    }

    if (!review.user_id.equals(userId)) {
        throw new AppError("Forbidden", HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
    }

    const updatedReview = await reviewRepo.updateReview(reviewId, updateData);

    return updatedReview;
}

async function deleteReview(userId, reviewId) {
    const review = await reviewRepo.findReviewById(reviewId);

    if (!review) {
        throw new AppError("Review not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.REVIEW_NOT_FOUND);
    }

    if (!review.user_id.equals(userId)) {
        throw new AppError("Forbidden", HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
    }

    const deletedReview = await reviewRepo.deleteReview(reviewId);

    return deletedReview;
}

module.exports = {
    createReview,
    getEventReviews,
    getReviewById,
    updateReview,
    deleteReview,
};
