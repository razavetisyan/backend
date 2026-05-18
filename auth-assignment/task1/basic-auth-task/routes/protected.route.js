const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, (req, res) => {
    res.json({
        message : `Welcome ${req.user.username}`,
        username : req.user.username
    });
});

module.exports = router;