const express = require("express");
const router = express.Router();

const { readFile, writeFile } = require("../utils/file.js");

router.get("/", (req, res) => {
  const products = readFile("./data/products.json");

  res.json({ products });
});



router.get("/:id", (req, res) => {
  const products = readFile("./data/products.json");

  const product = products.find((p) => p.id == Number(req.params.id));

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json({ product });
});


router.post("/", (req, res) => {
  const { user_id, name, price } = req.body;

  const users = readFile("./data/users.json");

  const user = users.find((a) => a.id === Number(user_id));

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      error: "Only admin",
    });
  }

  const products = readFile("./data/products.json");

  const newProduct = {
    id: products.length + 1,
    name: name,
    price: price,
  };

  products.push(newProduct);

  writeFile("./data/products.json", products);

  res.status(201).json({
    message: "Product created",
    product: newProduct,
  });
});

router.put("/:id", (req, res) => {
  const { user_id, name, price } = req.body;

  const users = readFile("./data/users.json");

  const user = users.find((a) => a.id === user_id);

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      error: "Only admin",
    });
  }

  const products = readFile("./data/products.json");

  const index = products.findIndex((a) => a.id === Number(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      error: "Index not found",
    });
  }

  products[index] = {
    id: products[index].id,
    name: name,
    price,
  };

  writeFile("./data/products.json", products);

  res.json({
    message: "Product uptaded",
    product: products[index],
  });
});

router.delete("/:id", (req, res) => {

  const users = readFile("./data/users.json");

  const user = users.find((a) => a.id === Number(req.params.id));

  if (!user) {
    return res.status(404).json({
      error: "User not found",
    });
  }

  if (user.role !== "admin") {
    return res.status(403).json({
      error: "Only admin",
    });
  }

  const products = readFile("./data/products.json");
  const productId = Number(req.params.id);

  const product = products.find(a => a.id === productId);

  if(!product) {
    return res.status(404).json({
        error : "Product not found"
    });
  }

  const filtered = products.filter(a => a.id !== productId);

  writeFile("./data/products.json", filtered);

  res.status(200).json({
    message : "Product deleted"
  });
});

module.exports = router;
