const router = require("express").Router();

const apiKeyMiddleware = require("../middlewares/api.key.middleware.js");
const requirePermission = require("../middlewares/requirePermission.middleware.js");

const products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Phone" },
  { id: 3, name: "Headphones" },
];

router.post(
  "/",
  apiKeyMiddleware,
  requirePermission("write"),
  (req, res) => {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: "Product name required",
      });
    }

    const newProduct = {
      id: products.length + 1,
      name,
    };

    products.push(newProduct);

    res.status(201).json({
      message: "Product created",
      product: newProduct,
    });
  },
);

module.exports = router;