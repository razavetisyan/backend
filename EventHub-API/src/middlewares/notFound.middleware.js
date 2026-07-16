const AppError = require("../utils/AppError.js");

const ERROR_CODES = require("../constants/error-codes.constants.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");

function notFound(req, res, next) {
    next(new AppError("Route not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.ROUTE_NOT_FOUND));
}

module.exports = notFound;