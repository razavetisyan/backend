const { readJson, writeJson } = require("../utils/fileDb.js");
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "../../data/books.json");

async function getAllBooks() {
  const books = await readJson(FILE_PATH);

  return books;
}

async function createBook(data) {
  const books = await getAllBooks();

  books.push(data);

  await writeJson(FILE_PATH, books);

  return books;
}

async function updateBook(id, updateData) {
  const books = await getAllBooks();

  const index = books.findIndex((a) => a.id === id);

  if (index === -1) {
    return null;
  }

 Object.assign(books[index], updateData);

  await writeJson(FILE_PATH, books);

  return books[index];
}

async function deleteBook(id) {
  const books = await getAllBooks();

  const filtered = books.filter((a) => a.id !== id);

  if (books.length === filtered.length) {
    return false;
  }

  await writeJson(FILE_PATH, filtered);

  return true;
}

async function getBookById(id) {
  const books = await getAllBooks();

  return books.find((a) => a.id === id);
}

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook,
  getBookById,
};
