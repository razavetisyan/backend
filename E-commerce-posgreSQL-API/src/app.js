const express = require("express");

const app = express();

const errorMiddleware = require("./middlewares/error.middleware.js");

const authRouter = require("./routes/auth.routes.js");
const productRouter = require("./routes/product.routes.js");
const categoryRouter = require("./routes/category.routes.js");
const cartRouter = require("./routes/cart.routes.js");
const OrderRouter = require("./routes/order.routes.js");
const ReviewRouter = require("./routes/review.routes.js");

app.use(express.json());

app.use("/auth", authRouter);
app.use("/products", productRouter);
app.use("/categories", categoryRouter);
app.use("/carts", cartRouter);
app.use("/orders", OrderRouter);
app.use("/", ReviewRouter);

app.use(errorMiddleware);

module.exports = app;
