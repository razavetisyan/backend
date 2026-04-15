
const fs = require("fs");
const path = require("path");

const obj = {
    name : "Bob",
    age : 12
}

const parseTemplate = require("./template-engine.js");

const templatePath = path.join(__dirname, "./template.txt");

const fileRead = fs.readFileSync(templatePath, "utf-8");

const finalFile = parseTemplate(fileRead, obj);

const outputDir = path.join(__dirname, "output");

if(!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, {recursive : true});
}

const outputFile = path.join(outputDir, "./result.js");

fs.writeFileSync(outputFile, finalFile);