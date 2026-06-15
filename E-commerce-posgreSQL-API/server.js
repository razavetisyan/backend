const app = require("./src/app.js");
const { sequelize } = require("./models");

async function start() {
  await sequelize.authenticate();
  console.log("DB connected");

  app.listen(3000, () => {
    console.log("Server running");
  });
}

start();