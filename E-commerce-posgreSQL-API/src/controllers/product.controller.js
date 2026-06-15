const ProductService = require("../services/product.service.js");

async function getAllProducts(req, res, next) {
  try {
    const { category } = req.query;

    const products = await ProductService.getAllProducts(category);

    res.status(200).json({
      message: "All products",
      products,
    });
  } catch (err) {
    next(err);
  }
}

async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    const product = await ProductService.getProductById(id);

    res.status(200).json({
      message: "Product",
      product,
    });
  } catch (err) {
    next(err);
  }
}

async function createProduct(req, res, next) {
  try {
    const product = await ProductService.createProduct(req.body);

    res.status(201).json({
      message: "Created",
      product,
    });
  } catch (err) {
    next(err);
  }
}

async function updateProduct(req, res, next) {
    try {
        const { id } = req.params;

        const product = await ProductService.updateProduct(id, req.body);

        res.status(200).json({
            message : "Updated",
            product
        });
    } catch (err) {
        next(err);
    }   
}

async function deleteProduct(req, res, next) {
    try {
        const { id } = req.params;

        const product = await ProductService.deleteProduct(id);

        res.status(200).json({
            message : "Deleted product",
            product
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
}