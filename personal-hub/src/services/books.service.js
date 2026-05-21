const BooksModel = require("../models/book.model.js");
const { generateId } = require("../utils/id.js");
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
  const newBook = {
    id: generateId(),
    title: data.title,
    author: data.author,
    status: data.status || "to-read",
    rating: data.rating || null,
    createdAt: new Date().toISOString(),
  };

  return await BooksModel.createBook(newBook);
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

  await BooksModel.deleteBook(id);
}

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};
