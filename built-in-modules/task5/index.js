
const fs = require("fs");
const path = require("path");

const appended = require("./append.js");

const text = "User logging in";

const finalFile = appended(text);

const filePath = path.join(__dirname, "./result.txt");

fs.appendFile(filePath, finalFile, (err) => {
    if(err) {
        throw err;
    }

    console.log("file appended");
})