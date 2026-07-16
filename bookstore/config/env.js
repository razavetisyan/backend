require("dotenv").config({quiet : true});

module.exports = {
    DB_PORT : process.env.DB_PORT,
    DB_HOST : process.env.DB_HOST,
    DB_USER : process.env.DB_USER,
    DB_DATABASE : process.env.DB_DATABASE
}