const { readJson, writeJson } = require("../utils/fileDb.js");
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "../../data/users.json");

async function getAllUsers() {
  const books = await readJson(FILE_PATH);

  return books;
}

async function createUser(user) {
  const users = await readJson(FILE_PATH);

  users.push(user);

  await writeJson(FILE_PATH, users);
}

async function getUserByName(username) {
  const users = await getAllUsers();

  const user = users.find((a) => a.username === username);

  return user;
}

module.exports = {
  getAllUsers,
  createUser,
  getUserByName,
};
