const fs = require("fs");
const path = require("path");

const path1 = require("./path.js");

path1.forEach(pathName => {

    const fullpath = path.resolve(pathName);

    fs.mkdir(pathName, {recursive : true}, (err) => {
        if(err) {
            throw err;
        }
    });
    
    console.log(fullpath);
});
