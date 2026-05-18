const express = require("express");
const router = express.Router();

const { readFile, writeFile } = require("../utils/file.js");

router.get("/:user_id", (req, res) => {
  const carts = readFile("./data/carts.json");
  const userId = req.params.user_id;

  const cart = carts.find((a) => a.user_id === Number(userId));

  if (!cart) {
    return res.status(404).json({
      error: "Cart not found",
    });
  }

  res.json({ cart });
});

router.post("/:user_id", (req, res) => {
  const { product_id, quantity } = req.body;

  const carts = readFile("./data/carts.json");

  const userId = req.params.user_id;

  const cart = carts.find((a) => a.user_id === Number(userId));

  if (!cart) {
    return res.status(404).json({
      error: "Cart not found",
    });
  }

  const item = cart.items.find((a) => a.product_id === product_id);

  if (item) {
    item.quantity += quantity;
  } else {
    cart.items.push({
      product_id,
      quantity,
    });
  }

  writeFile("./data/carts.json", carts);

  res.status(201).json({
    message: "Item created",
    cart
  });
});

router.delete("/:user_id/:product_id", (req, res) => {
    const carts = readFile("./data/carts.json");

    const userId = Number(req.params.user_id);
    const productId = Number(req.params.product_id);

    const cart = carts.find(a => a.user_id === userId);

    if(!cart) {
        return res.status(404).json({
            error : "Cart not found"
        });
    }

    const item = cart.items.find(a => a.product_id === productId);

    if(!item) {
        return res.status(404).json({
            error : "Product not found in cart"
        });
    }

    cart.items = cart.items.filter(a => a.product_id !== productId);

    writeFile("./data/carts.json", carts);

    res.status(200).json({
        message : "Deleted cart",
        cart
    });
});

router.delete("/:user_id", (req, res) => {
    const carts = readFile("./data/carts.json");

    const userId = Number(req.params.user_id);
    
    const cart = carts.find(a => a.user_id === userId);

    if(!cart) { 
        return res.status(404).json({
            error : "Cart not found"
        });
    }

    const filtered = carts.filter(a => a.user_id !== userId);

    writeFile("./data/carts.json", filtered);

    res.status(200).json({
        message : "Cart deleted",
        cart
    });
})

module.exports = router;
