const userRepo = require("../repositories/user.repository.js");

const AppError = require("../utils/AppError.js");
const {
    generateAccessToken,
    generateRefreshToken,
    verifyRefreshToken,
} = require("../utils/token.js");
const { hashToken, compareToken } = require("../utils/token-hash.js");

const HTTP_STATUS = require("../constants/http-status.constants.js");
const ERROR_CODES = require("../constants/error-codes.constants.js");

async function register(data) {
    const { email } = data;

    const existing = await userRepo.findByEmail(email);

    if (existing) {
        throw new AppError(
            "Email already exists",
            HTTP_STATUS.CONFLICT,
            ERROR_CODES.USER_ALREADY_EXISTS
        );
    }

    const user = await userRepo.createUser(data);

    const { accessToken, refreshToken } = generateAuthTokens(user);

    const hashed = await hashToken(refreshToken);

    await userRepo.setRefreshToken(user._id, hashed);

    return {
        user,
        accessToken,
        refreshToken,
    };
}

async function login(data) {
    const { email, password } = data;
    const user = await userRepo.findByEmail(data.email);

    if (!user) {
        throw new AppError(
            "Invalid email or password",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS
        );
    }

    const isMatch = user.comparePassword(password);

    if (!isMatch) {
        throw new AppError(
            "Invalid email or password",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_CREDENTIALS
        );
    }

    const { accessToken, refreshToken } = generateAuthTokens(user);

    const hashed = await hashToken(refreshToken);

    await userRepo.setRefreshToken(user._id, hashed);

    return {
        user,
        accessToken,
        refreshToken,
    };
}

async function refresh(refreshToken) {
    if (!refreshToken) {
        throw new AppError(
            "Refresh token required",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.REFRESH_TOKEN_REQUIRED
        );
    }

    let decoded;

    try {
        decoded = verifyRefreshToken(refreshToken);
    } catch (err) {
        throw new AppError(
            "Invalid refresh token",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.REFRESH_TOKEN_INVALID
        );
    }

    const user = await userRepo.findById(decoded.id);
    
    if (!user) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND, ERROR_CODES.USER_NOT_FOUND);
    }

    const isValidToken = await compareToken(refreshToken, user.refreshToken);

    if (!isValidToken) {
        throw new AppError(
            "Refresh token mismatch",
            HTTP_STATUS.UNAUTHORIZED,
            ERROR_CODES.INVALID_TOKEN
        );
    }

    const Tokens = generateAuthTokens(user);

    const hashed = await hashToken(Tokens.refreshToken);

    await userRepo.setRefreshToken(user._id, hashed);

    return {
        accessToken: Tokens.accessToken,
        refreshToken: Tokens.refreshToken,
    };
}

async function logout(userId) {
    await userRepo.clearRefreshToken(userId);
}

function generateAuthTokens(user) {
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    return {
        accessToken,
        refreshToken,
    };
}

module.exports = {
    login,
    logout,
    refresh,
    register,
};
