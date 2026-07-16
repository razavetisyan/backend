const Course = require("../models/Course.js");

async function getAllCourses() {
  return await Course.find().populate("teacher");
}

async function getCourseById(id) {
  return await Course.findById(id).populate("teacher");
}

async function createCourse(data) {
  return Course.create(data);
}

async function updateCourse(id, data) {
  return await Course.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

async function deleteCourse(id) {
  return await Course.findByIdAndDelete(id);
}

async function addMaterial(data) {
  return await Course.findByIdAndUpdate(
    data.courseId,
    {
      $push: {
        materials: data.material,
      },
    },
    { new: true },
  );
}

module.exports = {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  addMaterial,
};
