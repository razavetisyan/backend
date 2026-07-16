const express = require("express");

const authorsRouter = require("./authors/authors.routes.js");
const booksRouter = require("./books/books.routes.js");
const customersRouter = require("./customers/customers.routes.js");

const app = express();

app.use(express.json());

app.use("/authors", authorsRouter);
app.use("/books", booksRouter);
app.use("/customers", customersRouter);

module.exports = app;