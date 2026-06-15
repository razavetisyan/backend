const { Category } = require("../../models");

async function getAllCategories() {
  return await Category.findAll();
}

async function createCategory(data) {
  return await Category.create({
    name: data.name,
  });
}

async function deleteCategory(id) {
  return await Category.destroy({
    where: {
      id,
    },
  });
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory
}