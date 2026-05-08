const http = require("node:http");

let books = [
  { id: 1, title: "Clean Code", author: "Robert Martin", year: 2008 },
  { id: 2, title: "The Pragmatic Programmer", author: "Andy Hunt", year: 1999 },
];

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "application/json");

  if (req.method === "GET" && req.url === "/books") {
    res.statusCode = 200;

    return res.end(JSON.stringify(books));
  }

  if (req.method === "GET" && req.url.startsWith("/books/")) {
    const id = Number(req.url.split("/")[2]);
    const book = books.find((a) => a.id === id);

    if (!book) {
      res.statusCode = 404;

      return res.end(JSON.stringify({ message: "book not found" }));
    }

    res.statusCode = 200;

    return res.end(JSON.stringify(book));
  }

  if (req.method === "POST" && req.url === "/books") {
    const body = "";

    res.on("data", (chunk) => (body += chunk));

    res.on("end", () => {
      try {
        const data = JSON.parse(body);

        if (!data.title) {
          res.writeHead(400);

          return res.end(JSON.stringify({ error: "Title is required" }));
        }

        const newBook = {
          id: books.length + 1,
          title: data.title,
        };

        res.statusCode = 200;

        return res.end(JSON.stringify(newBook));
      } catch {
        res.statusCode(400);

        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

    return;
  }

  if (req.method === "PUT" && req.url.startsWith("/books/")) {
    const id = Number(req.url.split("/")[2]);

    if (isNaN(id)) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ error: "Invalid id" }));
    }

    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const book = books.find((a) => a.id === id);

        if (!book) {
          res.statusCode = 404;

          return res.end(JSON.stringify({ error: "Book not found" }));
        }

        if (!data.title) {
          res.statusCode = 400;

          return res.end(JSON.stringify({ error: "Title is required" }));
        }

        book.title = data.title;

        if (data.author) {
          book.author = data.author;
        }

        if (book.year) {
          book.year = data.year;
        }

        res.statusCode = 200;

        return res.end(JSON.stringify(book));
      } catch {
        res.statusCode = 400;

        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });

    return;
  }

  if (req.method === "PATCH" && req.url === "/books") {
    const id = Number(req.url.split("/")[2]);

    if (isNaN(id)) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ error: "Invalid id" }));
    }

    let body = "";

    req.on("data", (chunk) => (body += chunk));

    req.on("end", () => {
      try {
        const data = JSON.parse(body);

        const book = books.find((a) => a.id === id);

        if (!data.title) {
          res.statusCode = 404;

          return res.end(JSON.stringify({ error: "Title is required" }));
        }

        if (!book) {
          res.statusCode = 400;

          return res.end(JSON.stringify({ error: "Book not found" }));
        }

        if (data.title != undefined) {
          book.title = data.title;
        }

        if (data.author != undefined) {
          book.author = data.author;
        }

        if (data.year != undefined) {
          book.year = data.year;
        }

        res.statusCode = 200;

        return res.end(JSON.stringify(book));
      } catch {
        res.statusCode = 400;

        return res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
  }

  if (req.method === "DELETE" && req.url === "/books") {
    const id = Number(req.url.split("/")[2]);

    if (isNaN(id)) {
      res.statusCode = 400;

      return res.end(JSON.stringify({ error: "Invalid id" }));
    }

    const index = books.findIndex((a) => a.id === id);

    if (index === -1) {
      res.statusCode = 404;

      return res.end(JSON.stringify({ error: "Book not found" }));
    }

    const deletedBook = books.splice(index, 1);

    res.statusCode = 200;

    return res.end(
      JSON.stringify({
        message: "Book deleted",
        deletedBook: deletedBook[0],
      }),
    );
  }

  if (req.method === "OPTIONS") {

    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });

    return res.end();
  }

  res.writeHead(404);

  res.end(JSON.stringify({error : "Route not found"}));
});

server.listen(3000, () => {
    console.log("server running on http://localhost:3000");
})
