const { Pool } = require("pg");
const env = require("../../config/env.js");

const pool = new Pool({
    user : env.DB_USER,
    port : env.DB_PORT,
    host : env.DB_HOST,
    database : env.DB_DATABASE
});

module.exports = { pool };