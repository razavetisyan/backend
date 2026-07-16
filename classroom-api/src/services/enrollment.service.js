const Enrollment = require("../models/Enrollment.js");

async function getAllEnrollments() {
  return await Enrollment.find().populate("teacher").populate("course");
}

async function getEnrollmentById(id) {
  return await Enrollment.findById(id).populate("teacher").populate("course");
}

async function createEnrollment(data) {
  return await Enrollment.create(data);
}

async function updateEnrollment(id, data) {
  return await Enrollment.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteEnrollment(id) {
  return await Enrollment.findByIdAndDelete(id);
}

async function setGrade(id, grade) {
  return await Enrollment.findByIdAndUpdate(
    id,
    { grade },
    {
      new: true,
      runValidators: true,
    },
  );
}

async function markCompleted(id) {
  return await Enrollment.findByIdAndUpdate(
    id,
    {
      completed: true,
    },
    {
      new: true,
    },
  );
}

module.exports = {
    getAllEnrollments,
    getEnrollmentById,
    createEnrollment,
    updateEnrollment,
    deleteEnrollment,
    setGrade,
    markCompleted
}