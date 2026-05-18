const bcrypt = require("bcrypt");

const users = [
    {
        email : "armen@gmail.com",
        password : bcrypt.hashSync("armen1234", 10)
    },
    {
        email : "karine@gmail.com",
        password : bcrypt.hashSync("karine1234", 10)
    }
]

module.exports = users;