const express = require("express");
const path = require("node:path");

const registerRoutes = require("./routes/register.routes.js");
const loginRoutes = require("./routes/login.routes.js");
const userInfoRoutes = require("./routes/userInfo.routes.js");
const postsRoutes = require("./routes/posts.routes.js");

require("dotenv").config({
  path: path.resolve(__dirname, ".env"),
  quiet: true,
});

const app = express();

app.use(express.static("public"));

const PORT = parseInt(process.env.PORT);

app.use(express.json());

app.use("/api/register", registerRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/me", userInfoRoutes);
app.use("/api/posts", postsRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));