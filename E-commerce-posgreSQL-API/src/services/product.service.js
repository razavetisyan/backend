const { Product } = require("../../models");
const { Category } = require("../../models");

async function getAllProducts(category) {
  if (!category) {
    return await Product.findAll();
  }

  return await Product.findAll({
    include: [
      {
        model: Category,

        where: {
          name: category,
        },

        through: {
          attributes: [],
        },
      },
    ],
  });
}

async function getProductById(id) {
  return await Product.findByPk(id, {
    include: [
      {
        model: Category,

        through: {
          attributes: [],
        },
      },
    ],
  });
}

async function createProduct(data) {
  return await Product.create({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
  });
}

async function updateProduct(id, data) {
  await Product.update(data, {
    where: {
      id,
    },
  });

  return await Product.findByPk(id);
}

async function deleteProduct(id) {
  return await Product.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}