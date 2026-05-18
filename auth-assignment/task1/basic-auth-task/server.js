const express = require("express");
const path = require("node:path");

const publicRoutes = require("./routes/public.route.js");
const protectedRoutes = require("./routes/protected.route.js");
const secondProtectedRoutes = require("./routes/second.protected.route.js");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

const PORT = parseInt(process.env.PORT);

const app = express();

app.use(express.json());


app.use("/api/public", publicRoutes);
app.use('/api/me', protectedRoutes);
app.use("/api/items", secondProtectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
