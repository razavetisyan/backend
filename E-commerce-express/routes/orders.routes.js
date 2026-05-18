const express = require("express");
const router = express.Router();

const { readFile, writeFile } = require("../utils/file.js");

router.post("/:user_id", (req, res) => {

  const carts = readFile("./data/carts.json");
  const products = readFile("./data/products.json");
  const orders = readFile("./data/orders.json");

  const userId = Number(req.params.user_id);

  const cart = carts.find((a) => a.user_id === userId);

  if (!cart) {
    return res.status(404).json({
      error: "Cart not found",
    });
  }

  if (cart.items.length === 0) {
    return res.status(404).json({
      error: "Cart is empty",
    });
  }

  for (const item of cart.items) {
    const product = products.find((a) => a.id === item.product_id);

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    if (product.stock_quantity < item.quantity) {
      return res.status(400).json({
        error: "Out of stock",
      });
    }
  }

  const order = {
    id: Date.now(),
    user_id: userId,
    items: [...cart.items],
    created_at: new Date(),
  };

  cart.items.forEach((item) => {
    const product = products.find((a) => a.id === item.product_id);

    if (product) {
      product.stock_quantity -= item.quantity;
    }
  });

  cart.items = [];

  orders.push(order);

  writeFile("./data/carts.json", carts);
  writeFile("./data/products.json", products);
  writeFile("./data/orders.json", orders);

  res.status(201).json({
    message: "Checkout successful",
    order,
  });
});

router.get("/users/:user_id", (req, res) => {
  const userId = Number(req.params.user_id);

  const orders = readFile("./data/orders.json");

  const userOrders = orders.filter((a) => a.user_id === userId);

  if (userOrders.length === 0) {
    return res.status(404).json({
      error: "No orders for this user",
    });
  }

  res.json({
    user_id: userId,
    orders: userOrders,
  });
});

router.get("/:id", (req, res) => {
  const orders = readFile("./data/orders.json");

  const id = Number(req.params.id);

  const order = orders.find((a) => a.id === id);

  if (!order) {
    return res.status(404).json({
      error: "Order not found",
    });
  }

  res.json({ order });
});

router.put("/:id/status", (req, res) => {

    const { user_id, status } = req.body;
    console.log("BODY:", req.body);
    const orders = readFile("./data/orders.json");
    const users = readFile("./data/users.json");

    const user = users.find(u => u.id === Number(user_id));

    if (!user) {
        return res.status(404).json({
            error: "User not found"
        });
    }

    if (user.role !== "admin") {
        return res.status(403).json({
            error: "Only admin can update order status"
        });
    }

    const allowedStatuses = ["pending", "shipped", "delivered"];

    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
            error: "Invalid status"
        });
    }

    const order = orders.find(o => o.id === Number(req.params.id));

    if (!order) {
        return res.status(404).json({
            error: "Order not found"
        });
    }

    order.status = status;

    writeFile("./data/orders.json", orders);

    return res.json({
        message: "Order status updated successfully",
        order
    });
});

module.exports = router;
