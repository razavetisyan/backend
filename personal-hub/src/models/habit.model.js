const { readJson, writeJson } = require("../utils/fileDb.js");
const path = require("node:path");

const FILE_PATH = path.join(__dirname, "../../data/habits.json");

async function getAllHabits() {
  const habits = await readJson(FILE_PATH);

  return habits;
}

async function getHabitById(id) {
  const habits = await getAllHabits();

  const habit = habits.find((a) => a.id === id);

  return habit;
}

async function getHabitByOwnerId(ownerId) {
  const habits = await getAllHabits();

  const habit = habits.filter((a) => a.ownerId === ownerId);

  return habit;
}

async function createHabit(habit) {
  const habits = await getAllHabits();

  habits.push(habit);

  await writeJson(FILE_PATH, habits);
}

async function updateHabit(id, updatedHabit) {
  const habits = await getAllHabits();

  const index = habits.findIndex((a) => a.id === id);

  if (index === -1) {
    return null;
  }

  Object.assign(habits[index], updatedHabit);

  habits[index].updatedAt = new Date().toISOString();

  await writeJson(FILE_PATH, habits);

  return habits[index];
}

async function deleteHabit(id) {
  const habits = await getHabitById(id);

  const filtered = habits.filter((a) => a.id !== id);

  if (habits.length === filtered.length) {
    return false;
  }

  await writeJson(FILE_PATH, filtered);

  return true;
}

module.exports = {
  getAllHabits,
  getHabitById,
  getHabitByOwnerId,
  createHabit,
  updateHabit,
  deleteHabit,
};
