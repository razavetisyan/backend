const HabitsModel = require("../models/habit.model.js");
const UserModel = require("../models/user.model.js");
const { generateId } = require("../utils/id.js");
const { AppError } = require("../utils/AppError.js");

async function getAllHabits() {
  const habits = await HabitsModel.getAllHabits();

  return habits;
}

async function getHabitById(id, username) {
  const habit = await HabitsModel.getHabitById(id);
  const user = await UserModel.getUserByName(username);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  if (user.id !== habit.ownerId) {
    throw new AppError("This is not your habit", 403);
  }

  return habit;
}

async function getHabitByOwnerId(username) {
  const user = await UserModel.getUserByName(username);
  const habit = await HabitsModel.getHabitByOwnerId(user.id);

  if (habit.length === 0) {
    throw new AppError("Habit not found", 404);
  }

  return habit;
}

async function createHabit(data, username) {
  const user = await UserModel.getUserByName(username);

  const newHabit = {
    id: generateId(),
    ownerId: user.id,
    name: data.name,
    frequency: data.frequency,
    checkIns: 0,
    createdAt: new Date().toISOString(),
  };

  await HabitsModel.createHabit(newHabit);

  return newHabit;
}

async function updateHabit(id, updatedHabit) {
  const habit = await HabitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  const updated = await HabitsModel.updateHabit(id, updatedHabit);

  return updated;
}

async function deleteHabit(id) {
  const habit = await HabitsModel.getHabitById(id);

  if (!habit) {
    throw new AppError("Habit not found", 404);
  }

  const deleted = await HabitsModel.deleteHabit(id);

  return deleted;
}

async function checkInHabit(id) {
  const habit = await HabitsModel.getHabitById(id);

  if(!habit) {
    throw new AppError("Habit not found", 404);
  }

  habit.checkIns += 1;

  const update = await HabitsModel.updateHabit(id, { checkIns : habit.checkIns});

  return update;
}

module.exports = {
  getAllHabits,
  getHabitById,
  getHabitByOwnerId,
  createHabit,
  updateHabit,
  deleteHabit,
  checkInHabit
};
