const courseService = require("../services/course.service.js");

async function getAllCourses(req, res) {
    const courses = await courseService.getAllCourses();

    res.json(courses);
}

async function getCourseById(req, res) {
    const course = await courseService.getCourseById(req.params.id);

    res.json(course);
}

async function createCourse(req, res) {
    const course = await courseService.createCourse(req.body);

    res.status(201).json(course);
}

async function updateCourse(req, res) {
    const course = await courseService.updateCourse(req.params.id, req.body);

    res.json(course);
}

async function deleteCourse(req, res) {
    const course = await courseService.deleteCourse(req.params.id);

    res.json(course);
}

async function addMaterial(req, res) {
    const material = await courseService.addMaterial(req.body);

    res.json(material);
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    addMaterial
}