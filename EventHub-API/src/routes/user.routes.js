const router = require("express").Router();
const userController = require("../controllers/user.controller.js");

const authenticate = require("../middlewares/auth.middleware.js");

router.patch("/became-organizer", authenticate, userController.becameOrganizer);

module.exports = router;
