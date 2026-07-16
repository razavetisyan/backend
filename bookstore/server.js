const app = require("./src/app.js");

const env = require("./config/env.js");

app.listen(env.DB_PORT, () => {
  console.log(`Server running on port ${env.DB_PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
