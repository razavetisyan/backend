const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        organizer_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: false,
            trim: true,
        },

        category: {
            type: String,
            enum: ["music", "sport", "tech", "education", "business"],
            required: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        attendeesCount: {
            type: Number,
            default: 0,
            min: 0
        },

        location: {
            country: {
                type: String,
                required: true,
                trim: true
            },

            city: {
                type: String,
                required: true,
                trim: true

            },

            address: {
                type: String,
                required: true,
                trim: true

            }
        },

        startTime: {
            type: Date,
            required: true
        },

        endTime: {
            type: Date,
            required: true,

            validate: {
                validator: function (value) {
                    return value > this.startTime;
                },

                message: "endTime must be after startTime"
            }
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Event", eventSchema);