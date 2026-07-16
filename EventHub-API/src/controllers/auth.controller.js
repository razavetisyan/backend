const authService = require("../services/auth.service.js");

const HTTP_STATUS = require("../constants/http-status.constants.js");


async function register(req, res) {
    const result = await authService.register(req.body);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.CREATED).json({
        success: true,
        message: "User registered successfully",
        data: result.user,
    });
}

async function login(req, res) {
    const result = await authService.login(req.body);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logged in successfully",
        data: result.user,
    });
}

async function refresh(req, res) {
    const { refreshToken } = req.cookies;

    const result = await authService.refresh(refreshToken);

    res.cookie("accessToken", result.accessToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", result.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Tokens refreshed successfully",
        data: result,
    });
}

async function logout(req, res) {
    const { id } = req.user;

    await authService.logout(id);

    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    return res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Logged out successfully",
        data: null,
    });
}

module.exports = {
    login,
    logout,
    refresh,
    register,
};
