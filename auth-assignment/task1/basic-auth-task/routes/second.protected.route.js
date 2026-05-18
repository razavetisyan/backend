const router = require("express").Router();
const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, (req, res) => {
  res.json({
    user: req.user.username,
    items: [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Iphone" },
      { id: 3, name: "airPods" },
    ],
  });
});

module.exports = router;