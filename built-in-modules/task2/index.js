
const fs = require("fs");
const path = require("path");

const dirPath = path.resolve("dir");

fs.readdir(dirPath, (err, data) => {
    if(err) {
        throw err;
    }

    data.forEach(file => {
        if(file.endsWith(".js")){ 
            const filePath = path.join(dirPath, file);
            const resolvePath = path.resolve(filePath);

            console.log(resolvePath)
        }
    })
});

