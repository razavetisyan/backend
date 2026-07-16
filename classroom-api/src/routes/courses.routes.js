const router = require("express").Router();

const coursesController = require("../controllers/course.controller.js");
const asyncHandler = require("../middleware/asyncHandler.js");
const auth = require("../middleware/auth.js");

router.get("/", auth, asyncHandler(coursesController.getAllCourses));
router.get("/:id", auth, asyncHandler(coursesController.getCourseById));
router.post("/", auth, asyncHandler(coursesController.createCourse));
router.put("/:id", auth, asyncHandler(coursesController.updateCourse));
router.delete("/:id", auth, asyncHandler(coursesController.deleteCourse));
router.post("/materials", auth, asyncHandler(coursesController.addMaterial));

module.exports = router;