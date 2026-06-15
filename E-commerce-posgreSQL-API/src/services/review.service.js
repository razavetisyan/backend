const { Review, Order, OrderItem }= require("../../models");

async function getProductReview(productId) {
  return await Review.findAll({
    where: {
      product_id: productId,
    },
  });
}

async function createReview(userId, productId, data) {
  const { rating, comment } = data;

  const purchased = await OrderItem.findOne({
    where: {
      product_id: productId,
    },
    include: [
      {
        model: Order,
        where: {
          user_id: userId,
          status : "delivered"
        },
      },
    ],
  });

  if (!purchased) {
    throw new Error("At first purchase product");
  }

  return await Review.create({
    user_id: userId,
    product_id: productId,
    rating,
    comment,
  });
}

async function deleteReview(reviewId, user) {
  const review = await Review.findByPk(reviewId);

  if (!review) {
    throw new Error("Review not found");
  }

  if (review.user_id !== user.id && user.role !== "admin") {
    throw new Error("Access denied");
  }

  await review.destroy();
}

module.exports = {
  getProductReview,
  createReview,
  deleteReview,
};
