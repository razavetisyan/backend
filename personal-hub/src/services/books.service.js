const BooksModel = require("../models/book.model.js");
const { AppError } = require("../utils/AppError.js");

async function getAllBooks() {
  return await BooksModel.getAllBooks();
}

async function getBookById(id) {
  const book = await BooksModel.getBookById(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return book;
}

async function createBook(data) {
  if(!data.title || !data.author) {
    throw new AppError("Data is required", 400);  
  }

  return await BooksModel.createBook(data);
}

async function updateBook(id, updateData) {
  const book = await BooksModel.getBookById(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  if (updateData.rating && book.status !== "finished") {
    throw new AppError("Rating allowed only for finished books", 400);
  }

  const updated = await BooksModel.updateBook(id, updateData);

  return updated;
}

async function deleteBook(id) {
  const book = await BooksModel.getBookById(id);

  if (!book) {
    throw new AppError("Book not found", 404);
  }

  return await BooksModel.deleteBook(id);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
