const router = require("express").Router();

const authMiddleware = require("../middlewares/auth.middleware.js");

router.get("/", authMiddleware, (req, res) => {
  const posts = [
    { id: 1, title: "Hello World", content: "First post" }
  ];

  res.json({
    message : "Posts",
    user : req.user,
    posts
  });
});

module.exports = router;