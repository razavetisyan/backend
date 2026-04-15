const fs = require("fs");
const path = require("path");

const filePath = path.resolve("./data.json");

fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) {
    throw err;
  }

  const parsed = JSON.parse(data);

  const result = {};

  for (const [key, val] of Object.entries(parsed)) {
    const splited = key.split("_");
    for (let i = 1; i < splited.length; ++i) {
      splited[i] = splited[i][0].toUpperCase() + splited[i].slice(1);
    }
    const resultKey = splited.join("");
    result[resultKey] = val;
  }

  fs.writeFile(filePath, JSON.stringify(result), () => {
    console.log("success");
  });
});
