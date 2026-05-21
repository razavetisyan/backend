const fs = require("node:fs").promises;

async function readJson(path) {
  const data = await fs.readFile(path, "utf-8");

  return JSON.parse(data);
}

async function writeJson(path, data) {
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}

module.exports = {
  readJson,
  writeJson,
};
