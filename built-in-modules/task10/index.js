const fs = require("fs");
const path = require("path");

const data = require("./data.js");

const fullPath = path.join(__dirname, "output.json");

fs.stat(fullPath, (err, stats) => {
  if (err) {
    const str = JSON.stringify(data);

    fs.writeFile(fullPath, str, (err) => {
      if (err) {
        throw err;
      }

      console.log("done");
    });

    return;
  }

  if (stats.size < 1024) {
    const str = JSON.stringify(data);

    fs.writeFile(fullPath, str, (err) => {
      if (err) {
        throw err;
      }

      console.log("done");
    });
  }
  
});
