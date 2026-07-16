const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");

const asyncHandler = require("../utils/asyncHandler.js");
const authenticate = require("../middlewares/auth.middleware.js");
const validate = require("../middlewares/validate.middleware.js");
const { registerSchema, loginSchema } = require("../validators/auth.validator.js");

router.post("/register", validate(registerSchema), asyncHandler(authController.register));
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", authenticate, asyncHandler(authController.logout));

module.exports = router;
