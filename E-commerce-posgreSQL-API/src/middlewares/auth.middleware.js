const jwt = require("jsonwebtoken");
const env = require("../config/env.js");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){ 
        return res.status(401).json({
            message : "Unauthorized"
        });
    }

    const token = authHeader.split(" ")[1];

    if(!token) {
        return res.status(404).json({
            message : "No token"
        });
    }

    try {
        const decoded = jwt.verify(token, env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch(err) {
         return res.status(401).json({
        message: "Invalid token"
    });
    }
}

module.exports = authMiddleware;