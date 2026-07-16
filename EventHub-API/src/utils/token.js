const jwt = require("jsonwebtoken");
const ENV = require("../config/env.js");
const AUTH = require("../constants/auth.constants");

function generateAccessToken(payload) {
    return jwt.sign(payload, ENV.JWT_ACCESS_SECRET, {
        expiresIn: AUTH.ACCESS_TOKEN_EXPIRES_IN,
    });
}

function generateRefreshToken(payload) {
    return jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
        expiresIn: AUTH.REFRESH_TOKEN_EXPIRES_IN,
    });
}

function verifyAccessToken(token) {
    return jwt.verify(token, ENV.JWT_ACCESS_SECRET);
}

function verifyRefreshToken(token) {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET);
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
};
