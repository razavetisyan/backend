const Event = require("../models/event.model.js");
const EventAttendee = require("../models/eventAttendee.model.js");

function createEvent(eventData) {
    return Event.create(eventData);
}

function findEventById(eventId) {
    return Event.findById(eventId);
}

function updateEvent(eventId, updateData) {
    return Event.findByIdAndUpdate(eventId, updateData, {
        returnDocument: "after",
        runValidators: true,
    });
}

function deleteEvent(eventId) {
    return Event.findByIdAndDelete(eventId);
}

function findEvents(filters = {}, pagination = {}) {
    const { page = 1, limit = 10 } = pagination;

    const query = {};

    if (filters.category) {
        query.category = filters.category;
    }

    if (filters.startDate || filters.endDate) {
        query.startTime = {};

        if (filters.startDate) {
            query.startTime.$gte = new Date(filters.startDate);
        }
    }

    if (filters.endDate) {
        query.startTime.$lte = new Date(filters.endDate);
    }

    if (filters.search) {
        query.$or = [
            { title: { $regex: filters.search, $options: "i" } },
            { description: { $regex: filters.search, $options: "i" } },
        ];
    }

    const skip = (page - 1) * limit;

    return Event.find(query).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
}

function createAttendance(memberId, eventId) {
    return EventAttendee.create({
        member_id: memberId,
        event_id: eventId,
    });
}

function findAttendance(memberId, eventId) {
    return EventAttendee.findOne({
        member_id: memberId,
        event_id: eventId,
    });
}

function deleteAttendance(memberId, eventId) {
    return EventAttendee.deleteOne({
        member_id: memberId,
        event_id: eventId,
    });
}

function incrementAttendeesCount(eventId) {
    return Event.findByIdAndUpdate(
        eventId,
        { $inc: { attendeesCount: 1 } },
        { returnDocument: "after" }
    );
}

function decrementAttendeesCount(eventId) {
    return Event.findOneAndUpdate(
        {
            _id: eventId,
            attendeesCount: { $gt: 0 },
        },
        { $inc: { attendeesCount: -1 } },
        { new: true }
    );
}

module.exports = {
    createEvent,
    findEventById,
    updateEvent,
    deleteEvent,
    findEvents,

    createAttendance,
    deleteAttendance,
    findAttendance,

    incrementAttendeesCount,
    decrementAttendeesCount,
};
