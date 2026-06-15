const { Cart, CartItem, Product } = require("../../models");

async function getCart(userId) {
  return await Cart.findOne({
    where: {
      user_id: userId,
    },
  });
}

async function addItem(userId, data) {
  const { productId, quantity } = data;

  let cart = await Cart.findOne({ where: { user_id: userId } });

  if (!cart) {
    cart = await Cart.create({ user_id: userId });
  }

  const existingItem = await CartItem.findOne({
    where: { cart_id: cart.id, product_id: productId },
  });

  if (existingItem) {
    return await existingItem.update({
      quantity: existingItem.quantity + quantity,
    });
  }

  return await CartItem.create({
    cart_id: cart.id,
    product_id: productId,
    quantity,
  });
}

async function updateItem(id, quantity) {
  await CartItem.update(
    { quantity },
    {
      where: { id },
    },
  );

  return await CartItem.findByPk(id);
}

async function deleteItem(id) {
  return await CartItem.destroy({
    where: { id },
  });
}

module.exports = {
  getCart,
  addItem,
  updateItem,
  deleteItem,
};
