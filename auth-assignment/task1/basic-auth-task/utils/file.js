const fs = require("node:fs");

function readFile(path){ 
    const data = fs.readFile(path, "utf-8");

    return JSON.parse(data);
}

function writeFile(path, data) {
    fs.writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = { readFile, writeFile };