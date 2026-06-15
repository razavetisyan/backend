const { Sequelize } = require("sequelize");
const env = require("./env.js");

const sequelize = new Sequelize (env.DB_URL, {
    dialect : "postgres",
    logging : false
});

module.exports = { sequelize };