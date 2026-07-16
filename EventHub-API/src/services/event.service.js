const eventRepo = require("../repositories/event.repository.js");

const AppError = require("../utils/AppError.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

async function createEvent(organizerId, eventData) {
    const event = await eventRepo.createEvent({
        organizer_id: organizerId,
        ...eventData,
    });

    return event;
}

async function getEvents(filters, pagination) {
    const events = await eventRepo.findEvents(filters, pagination);
    return events;
}

async function getEventById(eventId) {
    const event = await eventRepo.findEventById(eventId);
    return event;
}

async function updateEvent(eventId, organizerId, updateData) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    if (!event.organizer_id.equals(organizerId)) {
        throw new AppError("Forbidden", HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
    }

    const updatedEvent = await eventRepo.updateEvent(eventId, updateData);

    return event;
}

async function deleteEvent(eventId, organizerId) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    if (!event.organizer_id.equals(organizerId)) {
        throw new AppError("Forbidden", HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN);
    }

    const deletedEvent = await eventRepo.deleteEvent(eventId);

    return deletedEvent;
}

async function joinEvent(eventId, memberId) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    const attendance = await eventRepo.findAttendance(memberId, eventId);

    if (attendance) {
        throw new AppError("Already joined", HTTP_STATUS.CONFLICT, ERROR_CODES.ALREADY_JOINED);
    }

    if (event.attendeesCount >= event.capacity) {
        throw new AppError("Event is full", HTTP_STATUS.BAD_REQUEST, ERROR_CODES.EVENT_FULL);
    }

    const newAttendee = await eventRepo.createAttendance(memberId, eventId);
    await eventRepo.incrementAttendeesCount(eventId);

    return newAttendee;
}

async function leaveEvent(eventId, memberId) {
    const event = await eventRepo.findEventById(eventId);

    if (!event) {
        throw new AppError("Event not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.EVENT_NOT_FOUND);
    }

    const attendance = await eventRepo.findAttendance(memberId, eventId);

    if (!attendance) {
        throw new AppError(
            "Attendance not found",
            HTTP_STATUS.NOT_FOUND,
            ERROR_CODES.ATTENDANCE_NOT_FOUND
        );
    }

    await eventRepo.deleteAttendance(memberId, eventId);
    await eventRepo.decrementAttendeesCount(eventId);

    return { success: true };
}

module.exports = {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
    joinEvent,
    leaveEvent,
};
