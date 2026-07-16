const { z } = require("zod");

const createEventSchema = z
    .object({
        title: z.string().min(3).max(100),

        description: z.string().min(10).max(1000).optional(),

        category: z.string().min(2).max(50),

        location: z.object({
            country: z.string().min(2),
            city: z.string().min(2),
            address: z.string().min(5),
        }),

        startTime: z.coerce.date(),

        endTime: z.coerce.date(),

        capacity: z.number().int().positive().max(10000),
    })
    .refine((data) => data.endTime > data.startTime, {
        message: "End time must be after start time",
        path: ["endTime"],
    });

const updateEventSchema = z
    .object({
        title: z.string().min(3).max(100).optional(),

        description: z.string().min(10).max(1000).optional(),

        category: z.string().min(2).max(50).optional(),

        location: z
            .object({
                country: z.string().min(2),
                city: z.string().min(2),
                address: z.string().min(5),
            })
            .optional(),

        startTime: z.coerce.date().optional(),

        endTime: z.coerce.date().optional(),

        capacity: z.number().int().positive().max(10000).optional(),
    })
    .refine(
        (data) => {
            if (data.startTime && data.endTime) {
                return data.endTime > data.startTime;
            }
            return true;
        },
        {
            message: "End time must be after start time",
            path: ["endTime"],
        }
    );

module.exports = {
    createEventSchema,
    updateEventSchema,
};
