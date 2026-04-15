
const fs = require("fs");
const path = require("path");

const gen = require("./generator.js");

const filePath = path.resolve("./report.txt");

const newFile = gen("./report.txt");

const changedName = path.resolve(newFile);

fs.copyFile(filePath, changedName, (err) => {
    if(err) {
        throw err;
    }

    console.log("from", filePath);
    console.log("to", changedName);
});

