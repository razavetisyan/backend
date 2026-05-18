const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, (req, res) => {
    res.json({
        message : "User info",
        user : req.user
    });
});

module.exports = router;