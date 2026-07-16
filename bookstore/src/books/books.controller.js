const booksService = require("./books.service.js");

async function getAllBooks(req, res) {
  const books = await booksService.getAllBooks();

  res.status(200).json(books);
}

async function getBookById(req, res) {
  const book = await booksService.getBookById(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
}

async function createBook(req, res) {
  const book = await booksService.createBook(req.body);

  res.status(201).json(book);
}

async function updateBook(req, res) {
  const book = await booksService.updateBook(req.params.id, req.body);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
}

async function deleteBook(req, res) {
  const book = await booksService.deleteBook(req.params.id);

  if (!book) {
    return res.status(404).json({
      message: "Book not found",
    });
  }

  res.status(200).json(book);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
