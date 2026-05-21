const jwt = require("jsonwebtoken");
const { AppError } = require("../utils/AppError.js");

function signToken(payload, secret) {
    return jwt.sign(payload, secret, {expiresIn : "20m"});
}

function verifyToken(token, secret) {
    try {
        const decoded = jwt.verify(token, secret);

        return decoded;
    } catch (err) {
        throw new AppError(err.message, 401);
    }
}

module.exports = {
    signToken,
    verifyToken
}