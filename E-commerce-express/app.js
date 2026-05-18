const express = require("express");
const path = require("node:path");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

const app = express();
const PORT = parseInt(process.env.PORT);

const HOST = process.env.HOST;

app.use(express.json());

const productRoutes = require("./routes/product.routes.js");
const userRoutes = require("./routes/user.routes.js");
const cartRoutes = require("./routes/cart.routes.js");
const orderRoutes = require("./routes/orders.routes.js");

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));