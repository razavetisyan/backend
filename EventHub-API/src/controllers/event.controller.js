const eventService = require("../services/event.service.js");

const HTTP_STATUS = require("../constants/http-status.constants.js");


async function createEvent(req, res) {
    const { id } = req.user;
    const eventData = req.body;

    const event = await eventService.createEvent(id, eventData);

    return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "Event created successfully",
        data: event,
    });
}

async function getEvents(req, res) {
    const filters = {
        category: req.query.category,
        search: req.query.search,
        startDate: req.query.startDate,
        endDate: req.query.endDate,
    };

    const pagination = {
        page: Number(req.query.page) || 1,
        limit: Number(req.query.limit) || 10,
    };

    const events = await eventService.getEvents(filters, pagination);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Events fetched successfully",
        data: events,
    });
}

async function getEventById(req, res) {
    const { eventId } = req.params;

    const event = await eventService.getEventById(eventId);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Event fetched successfully",
        data: event,
    });
}

async function updateEvent(req, res) {
    const updateData = req.body;
    const { id } = req.user;
    const { eventId } = req.params;

    const event = await eventService.updateEvent(eventId, id, updateData);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Event updated successfully",
        date: event,
    });
}

async function deleteEvent(req, res) {
    const { eventId } = req.params;
    const { id } = req.user;

    await eventService.deleteEvent(eventId, id);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Event deleted successfully",
    });
}

async function joinEvent(req, res) {
    const { eventId } = req.params;
    const { id } = req.user;

    const attendance = await eventService.joinEvent(eventId, id);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Joined event successfully",
        data: attendance,
    });
}

async function leaveEvent(req, res) {
    const { id } = req.user;
    const { eventId } = req.params;

    await eventService.leaveEvent(eventId, id);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Left event successfully",
    });
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
