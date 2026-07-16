const userRepo = require("../repositories/user.repository.js");

const AppError = require("../utils/AppError.js");
const ROLES = require("../constants/roles.constants.js");
const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

async function becameOrganizer(userId) {
    const user = await userRepo.findById(userId);

    if (!user) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
    }

    const updatedUser = await userRepo.updateUser(userId, { role: ROLES.ORGANIZER });

    return updatedUser;
}

module.exports = {
    becameOrganizer,
};
