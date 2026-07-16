const router = require("express").Router();
const eventController = require("../controllers/event.controller.js");
const reviewController = require("../controllers/review.controller.js");

const asyncHandler = require("../utils/asyncHandler.js");
const validate = require("../middlewares/validate.middleware.js");
const authenticate = require("../middlewares/auth.middleware.js");
const authorize = require("../middlewares/authorize.middleware.js");

const { createEventSchema, updateEventSchema } = require("../validators/event.validator.js");
const { createReviewSchema } = require("../validators/review.validator.js");

const ROLES = require("../constants/roles.constants.js");

router.get("/", authenticate, asyncHandler(eventController.getEvents));
router.get("/:eventId", authenticate, asyncHandler(eventController.getEventById));

router.post(
    "/",
    authenticate,
    authorize(ROLES.ORGANIZER),
    validate(createEventSchema),
    asyncHandler(eventController.createEvent)
);

router.patch(
    "/:eventId",
    authenticate,
    authorize(ROLES.ORGANIZER),
    validate(updateEventSchema),
    asyncHandler(eventController.updateEvent)
);

router.delete(
    "/:eventId",
    authenticate,
    authorize(ROLES.ORGANIZER),
    asyncHandler(eventController.deleteEvent)
);

router.post(
    "/:eventId/join",
    authenticate,
    authorize(ROLES.MEMBER),
    asyncHandler(eventController.joinEvent)
);

router.delete(
    "/:eventId/join",
    authenticate,
    authorize(ROLES.MEMBER),
    asyncHandler(eventController.leaveEvent)
);

router.get("/:eventId/reviews", authenticate, asyncHandler(reviewController.getEventReviews));

router.post(
    "/:eventId/reviews",
    authenticate,
    validate(createReviewSchema),
    asyncHandler(reviewController.createReview)
);

module.exports = router;
