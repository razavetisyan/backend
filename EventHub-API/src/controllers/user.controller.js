const userService = require("../services/user.service.js");

const HTTP_STATUS = require("../constants/http-status.constants.js");


async function becameOrganizer(req, res) {
    const { id } = req.user;

    const user = await userService.becameOrganizer(id);

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "You are now an organizer",
        data: user,
    });
}

module.exports = {
    becameOrganizer,
};
