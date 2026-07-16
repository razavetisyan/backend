const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        event_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true
        },

        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },

        comment: {
            type: String,
            required: false,
            trim: true,
        }
    },
    {
        timestamps: true
    }
);

reviewSchema.index({ event_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("Review", reviewSchema);