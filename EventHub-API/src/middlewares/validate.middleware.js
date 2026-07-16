const AppError = require("../utils/AppError.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

function validate(schema) {
    return function (req, res, next) {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return next(
                new AppError(
                    "Validation Error",
                    HTTP_STATUS.BAD_REQUEST,
                    ERROR_CODES.VALIDATION_ERROR
                )
            );
        }

        req.body = result.data;
        next();
    };
}

module.exports = validate;
