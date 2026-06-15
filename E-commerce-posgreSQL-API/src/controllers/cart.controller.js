const CartService = require("../services/cart.service");

async function getCart(req, res, next) {
  try {
    const cart = await CartService.getCart(req.user.id);

    res.json({ message: "Cart", cart });
  } catch (err) {
    next(err);
  }
}

async function addItem(req, res, next) {
  try {
    const item = await CartService.addItem(req.user.id, req.body);

    res.status(201).json({ message: "Added to cart", item });
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const item = await CartService.updateItem(
      req.params.id,
      req.body.quantity
    );

    res.json({ message: "Updated", item });
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    await CartService.deleteItem(req.params.id);

    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem,
};