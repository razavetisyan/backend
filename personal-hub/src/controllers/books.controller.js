const BookService = require("../services/books.service.js");

async function getAllBooks(req, res, next) {
  try {
    const book = await BookService.getAllBooks();

    res.status(200).json({
      message: "All books",
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function getBookById(req, res, next) {
  try {
    const { id } = req.params;

    const book = await BookService.getBookById(id);

    res.status(200).json({
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function createBook(req, res, next) {
  try {
    const book = await BookService.createBook(req.body);

    res.status(201).json({
      message: "Created",
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function updateBook(req, res, next) {
  try {
    const book = await BookService.updateBook(req.params.id, req.body);

    res.status(200).json({
      message: "Updated",
      data: book,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;

    await BookService.deleteBook(id);

    res.status(200).json({
      message: "Deleted success",
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};