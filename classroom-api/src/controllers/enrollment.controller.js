const enrollmentService = require("../services/enrollment.service.js");

async function getAllEnrollments(req, res) {
    const enrollments = await enrollmentService.getAllEnrollments();

    res.json(enrollments);
}

async function getEnrollmentById(req, res) {
    const enrollment = await enrollmentService.getEnrollmentById(req.params.id);

    res.json(enrollment);
}

async function createEnrollment(req, res) {
    const enrollment = await enrollmentService.createEnrollment(req.body);

    res.status(201).json(enrollment);
}

async function updateEnrollment(req, res) {
    const enrollment = await enrollmentService.updateEnrollment(req.params.id, req.body);

    res.json(enrollment);
}

async function deleteEnrollment(req, res) {
    const enrollment = await enrollmentService.deleteEnrollment(req.params.id);

    res.json(enrollment);
}

async function setGrade(req, res) {
    const enrollment = await enrollmentService.setGrade(req.params.id, req.body.grade);

    res.json(enrollment);
}

async function markCompleted(req, res) {
    const marked = await enrollmentService.markCompleted(req.params.id);

    res.json(marked);
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