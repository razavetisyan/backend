const router = require("express").Router();

const enrollmentController = require("../controllers/enrollment.controller.js");

const asyncHandler = require("../middleware/asyncHandler.js");
const auth = require("../middleware/auth.js");

router.get("/", auth, asyncHandler(enrollmentController.getAllEnrollments));
router.get("/:id", auth, asyncHandler(enrollmentController.getEnrollmentById));
router.post("/", auth, asyncHandler(enrollmentController.createEnrollment));
router.put("/:id", auth, asyncHandler(enrollmentController.updateEnrollment));
router.delete(
  "/:id",
  auth,
  asyncHandler(enrollmentController.deleteEnrollment),
);
router.post("/:id/grade", auth, asyncHandler(enrollmentController.setGrade));
router.post(
  "/:id/complete",
  auth,
  asyncHandler(enrollmentController.markCompleted),
);

module.exports = router;
