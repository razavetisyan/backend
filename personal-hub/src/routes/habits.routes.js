const router = require("express").Router();
const { authMiddleware } = require("../middlewares/auth.middleware.js");
const { validateHabit } = require("../middlewares/validate.middleware.js");

const HabitsController = require("../controllers/habits.controller.js");

router.get("/", authMiddleware, HabitsController.getHabitByOwnerId);
router.get("/:id", authMiddleware, HabitsController.getHabitById);
router.post("/", authMiddleware, validateHabit, HabitsController.createHabit);
router.post("/:id/check-in", authMiddleware, validateHabit, HabitsController.checkInHabit);
router.patch("/:id", authMiddleware, validateHabit, HabitsController.updateHabit);
router.delete("/:id", authMiddleware, HabitsController.deleteHabit);

module.exports = router;