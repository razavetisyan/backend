const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const errorHandler = require("./middlewares/error.middleware.js");
const notFound = require("./middlewares/notFound.middleware.js");

const routes = require("./routes");

const app = express();

app.use(helmet());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
    })
);

app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
