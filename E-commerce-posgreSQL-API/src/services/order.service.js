const { Cart, CartItem, Product, Order, OrderItem } = require("../../models");

async function checkout(userId) {
  const cart = await Cart.findOne({
    where: { user_id: userId },
    include: [
      {
        model: CartItem,
        include: [Product],
      },
    ],
  });

  if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
    throw new Error("Cart is empty");
  }

  let total = 0;
  for (const item of cart.CartItems) {
    total += item.quantity * item.Product.price;
  }

  const order = await Order.create({
    user_id: userId,
    total,
    status: "pending",
  });

  for (const item of cart.CartItems) {
    await OrderItem.create({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price_at_purchase: item.Product.price,
    });
  }

  await CartItem.destroy({
    where: { cart_id: cart.id },
  });

  return order;
}

async function getOrders() {
  return await Order.findAll();
}

async function getOrderById(id) {
  return await Order.findByPk(id, {
    include: [
      {
        model: OrderItem,
        include: [Product],
      },
    ],
  });
}

async function updateStatus(id, status) {
  await Order.update({ status }, { where: { id } });
  return Order.findByPk(id);
}

module.exports = {
  checkout,
  getOrders,
  getOrderById,
  updateStatus,
};
