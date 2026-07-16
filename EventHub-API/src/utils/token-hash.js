const bcrypt = require("bcrypt");

const AUTH = require("../constants/auth.constants.js");

function hashToken(token) {
    return bcrypt.hash(token, AUTH.HASH_SALT_ROUNDS);
}

function compareToken(plainToken, hashedToken) {
    return bcrypt.compare(plainToken, hashedToken);
}

module.exports = {
    hashToken,
    compareToken,
};
