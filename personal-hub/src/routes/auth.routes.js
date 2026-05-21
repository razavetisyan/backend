const router = require("express").Router();

const authController = require("../controllers/auth.controller.js");

const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validateRegister } = require("../middlewares/validate.middleware.js");

router.post("/register", validateRegister, authController.registerUser);
router.post("/login", validateRegister, authController.loginUser);
router.post("/logout", authMiddleware, authController.logoutUser);
router.get("/me", authMiddleware, authController.getProfile);

module.exports = router;