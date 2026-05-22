const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const routes = require("./routes");

const errorMiddleware = require("./middlewares/error.middleware.js");
const notFoundMiddleware = require("./middlewares/notFound.middleware.js");

app.use("/api", routes);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
