const AppError = require("../utils/AppError.js");
const { verifyAccessToken } = require("../utils/token.js");

const ENV = require("../config/env.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

function authenticate(req, res, next) {
    const token = req.cookies.accessToken;

    if (!token) {
        return next(
            new AppError("No Token Provided", HTTP_STATUS.UNAUTHORIZED, ERROR_CODES.UNAUTHORIZED)
        );
    }

    try {
        const decoded = verifyAccessToken(token);
        req.user = decoded;

        next();
    } catch (err) {
        next(err);
    }
}

module.exports = authenticate;
