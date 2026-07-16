const AppError = require("../utils/AppError");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

function authorize(...allowedRoles) {
    return function (req, res, next) {
        const user = req.user;

        if (!user) {
            return next(
                new AppError("Unauthorized", HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED)
            );
        }

        if (!allowedRoles.includes(user.role)) {
            return next(new AppError("Forbidden", HTTP_STATUS.FORBIDDEN, ERROR_CODES.FORBIDDEN));
        }

        next();
    };
}

module.exports = authorize;
