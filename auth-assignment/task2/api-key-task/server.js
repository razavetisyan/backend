const express = require("express");
const path = require("node:path");

const productRoutes = require("./routes/products.routes.js");
const createRoutes = require("./routes/create.routes.js");
const publicRoutes = require("./routes/public.routes.js");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

const app = express();

app.use(express.json());

const PORT = parseInt(process.env.PORT);

app.use("/api/products", productRoutes);
app.use("/api/products/newproduct", createRoutes);
app.use("/api/public", publicRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
