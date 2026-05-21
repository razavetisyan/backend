const UserService = require("../services/auth.service.js");

async function registerUser(req, res, next) {
  try {
    const user = await UserService.registerUser(req.body);

    res.cookie("token", user.token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "User registered",
      user : user.username,
      token : user.token
    });
  } catch (err) {
    next(err);
  }
}

async function loginUser(req, res, next) {
  try {
    const user = await UserService.loginUser(req.body);

    res.cookie("token", user.token, {
        httpOnly : true,
        secure : false,
        sameSite : "lax",
        maxAge : 24 * 60 * 60 * 1000
    })

    res.status(200).json({
      message: "Login success",
      user: user.username,
      token : user.token
    });
  } catch (err) {
    next(err);
  }
}

async function logoutUser(req, res, next) {
  try {
    res.clearCookie("token");

    res.status(200).json({
        message : "Logout success"
    })
  } catch (err) {
    next(err);
  }
}

async function getProfile(req, res, next) {
    try {
        const user = await UserService.getProfile(req.user.username);

        res.status(200).json({
            user,
        })
    } catch(err) {
        next(err);
    }
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
    getProfile
}