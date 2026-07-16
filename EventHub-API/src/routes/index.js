const router = require("express").Router();

const authRoutes = require("./auth.routes.js");
const userRoutes = require("./user.routes.js");
const eventRoutes = require("./event.routes.js");
const reviewRoutes = require("./review.routes.js");

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/events", eventRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
