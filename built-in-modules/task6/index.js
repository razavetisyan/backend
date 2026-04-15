
const fs = require("fs");
const path = require("path");

const parser = require("./parser.js");

const configPath = path.join(__dirname, "./config.env");

fs.readFile(configPath, "utf-8", (err, data) => {
    if(err) {
        throw err;
    }

    const config = parser(data);

    const required = ["PORT", "DB_HOST", "DB_USER"];

    for(let key of required) {

        if(!config[key]) {
            throw new Error("missing config");
        }
    }

    console.log(config);
})