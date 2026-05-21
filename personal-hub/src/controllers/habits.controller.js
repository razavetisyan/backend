const HabitsService = require("../services/habits.service.js");

async function getAllHabits(req, res, next) {
  try {
    const habits = await HabitsService.getAllHabits();

    res.status(200).json({
      message: "All habits",
      habits,
    });
  } catch (err) {
    next(err);
  }
}

async function getHabitByOwnerId(req, res, next) {
  try {
    const habit = await HabitsService.getHabitByOwnerId(req.user.username);

    res.status(200).json({
      habit,
    });
  } catch (err) {
    next(err);
  }
}

async function getHabitById(req, res, next) {
  try {
    const { id } = req.params;

    const habit = await HabitsService.getHabitById(id, req.user.username);

    res.status(200).json({
      habit,
    });
  } catch (err) {
    next(err);
  }
}

async function createHabit(req, res, next) {
  try {
    const habit = await HabitsService.createHabit(req.body, req.user.username);

    res.status(201).json({
      message: "Created",
      habit,
    });
  } catch (err) {
    next(err);
  }
}

async function updateHabit(req, res, next) {
  try {
    const { id } = req.params;

    const habit = await HabitsService.updateHabit(id, req.body);

    res.staus(200).json({
      message: "Updated",
      habit,
    });
  } catch (err) {
    next(err);
  }
}

async function deleteHabit(req, res, next) {
    try {
        const { id } = req.params;

        const habit = await HabitsService.deleteHabit(id);

        res.status(200).json({
            message : "Deleted",
            habit
        });
    } catch (err) {
        next(err);
    }
}

async function checkInHabit(req, res, next) {
    try {
        const { id } = req.params;

        const habit = await HabitsService.checkInHabit(id);

        res.status(200).json({
            message : "CheckIns updated",
            habit
        })
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllHabits,
    getHabitById,
    getHabitByOwnerId,
    createHabit,
    updateHabit,
    deleteHabit,
    checkInHabit
}