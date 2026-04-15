
const fs = require("fs");
const path = require("path");

const renamedFiles = require("./renameFiles");
const fullPath = path.join(__dirname, "dir");

fs.readdir(fullPath, (err, files) => {
    if(err) {
        throw err;
    }

    files.forEach((file, index) => {
        
        const oldPath = path.join(fullPath, file);

        const newName = renamedFiles(file, index);

        const newPath = path.join(fullPath, newName);

        fs.rename(oldPath, newPath, (err) => {
            if(err) {
                throw err;
            }

            console.log(`${file} -> ${newName}`);
        })
    })
})