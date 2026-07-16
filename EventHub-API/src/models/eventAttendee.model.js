const mongoose = require("mongoose");

const eventAttendeeSchema = new mongoose.Schema(
    {
        member_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        }
    },
    {
        timestamps: true
    }
);

eventAttendeeSchema.index({ event_id: 1, member_id: 1 }, { unique: true });

module.exports = mongoose.model("EventAttendee", eventAttendeeSchema);