const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware.js");
const authController = require("../controllers/auth.controller.js");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authMiddleware, authController.me);

module.exports = router;
