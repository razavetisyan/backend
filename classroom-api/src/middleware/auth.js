const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message : "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];

  if(!token) {
    return res.status(404).json({
      message : "Token not found"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (err) {
    res.status(500).json({
      message : "Server error"
    });
  }
}

module.exports = auth;