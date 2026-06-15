const CategoryService = require("../services/categorie.service.js");

async function getAllCategories(req, res, next) {
  try {
    const categories = await CategoryService.getAllCategories();

    res.status(200).json({
      message: "Categories",
      categories
    });
  } catch (err) {
    next(err);
  }
}

async function createCategory(req, res, next) {
  try {
    const category = await CategoryService.createCategory(req.body);

    res.status(201).json({
      message: "Created category",
      category,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteCategory(req, res, next) {
    try {
        const { id } = req.params;

        const category = await CategoryService.deleteCategory(id);

        res.status(200).json({
            message : "Deleted",
            category
        });
    } catch(err) {
        next(err);
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategory
}