const router = require("express").Router();

const apiKeyMiddleware = require("../middlewares/api.key.middleware.js");
const requirePermission = require("../middlewares/requirePermission.middleware.js");

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Headphones" },
];

router.get("/", apiKeyMiddleware, requirePermission("read"), (req, res) => {
  res.json({
    client: req.client,
    products,
  });
});

module.exports = router;
