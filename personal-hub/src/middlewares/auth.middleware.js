const { verifyToken } = require("../utils/token.js");
const { JWT_SECRET } = require("../config/env.js");

function authMiddleware(req, res, next) {
    let token;

    const authHeader = req.headers.authorization;

    if(authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
    }

    if(!token){ 
        token = req.cookies.token;
    }

    if(!token){ 
        return res.status(401).json({
            message : "No token"
        });
    }

    try {
        const decoded = verifyToken(token, JWT_SECRET);
        
        req.user = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message : "Invalid token"
        });
    }
}

module.exports = { authMiddleware };