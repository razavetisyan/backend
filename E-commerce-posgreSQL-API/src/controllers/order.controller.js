const OrderService = require("../services/order.service.js");

async function checkout(req, res, next) {
  try {
    const order = await OrderService.checkout(req.user.id);

    res.status(200).json({
      message: "Checkout success",
      order,
    });
  } catch (err) {
    next(err);
  }
}

async function getOrders(req, res, next) {
  try {
    const orders = await OrderService.getOrders();

    res.status(200).json({
      message: "Orders",
      orders,
    });
  } catch (err) {
    next(err);
  }
}

async function getOrderById(req, res, next) {
  try {
    const order = await OrderService.getOrderById(req.params.id);

    res.status(200).json({
        message : "Order",
        order
    })
  } catch (err) {
    next(err);
  }
}

async function updateStatus(req, res, next) {
    try {
        const order = await OrderService.updateStatus(req.params.id, req.body.status);

        res.status(200).json({
            message : "Updated",
            order
        });
    } catch(err) {
        next(err);
    }
}

module.exports = {
    checkout,
    getOrders,
    getOrderById,
    updateStatus
}