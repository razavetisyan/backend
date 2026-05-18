const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
  const authHead = req.headers.authorization;

  if (!authHead) {
    return res.status(401).json({
      error: "No token",
    });
  }
  
  const token = authHead.split(" ")[1];

  try {

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({
      error: "Invalid or expired token",
    });
  }
}

module.exports = authMiddleware;
