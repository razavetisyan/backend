
const fs = require("fs");
const path = require("path");

const htmlFunction = require("./html");

const dir = path.join(__dirname, "outputDir");
const htmlContent = htmlFunction("my html page");
const fullPath = path.join(dir, "index.html");

if(!fs.existsSync(dir)) {
    fs.mkdirSync(dir, {recursive : true});
}

fs.writeFile(fullPath, htmlContent, (err) => {
    if(err) {
        throw err;
    }

    console.log("file generated", fullPath);
})