const { z } = require("zod");

const createReviewSchema = z.object({
    rating: z.number().int().min(1).max(5),
    comment: z.string().min(1).max(500),
});

const updateReviewSchema = z.object({
    rating: z.number().int().min(1).max(5).optional(),
    comment: z.string().min(1).max(500).optional(),
});

module.exports = {
    createReviewSchema,
    updateReviewSchema,
};
