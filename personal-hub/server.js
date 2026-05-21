const app = require("./src/app.js");

const env = require("./src/config/env.js");

app.listen(env.PORT, () => {
  console.log(`Server running on port ${env.PORT}`);
});

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));