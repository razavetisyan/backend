const users = require("../data/users.js");

function authMiddleware(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res
      .status(401)
      .set("WWW-Authenticate", 'Basic realm="Login Required"')
      .json({
        error: "No authorization header",
      });
  }

  const base64 = authorization.split(" ")[1];
  
  const decoded = Buffer.from(base64, "base64").toString("utf-8");

  const [username, password] = decoded.split(":");

  const user = users.find(
    (a) => a.username === username && a.password === password,
  );

  if (!user) {
    return res
      .status(401)
      .set("WWW-Authenticate", 'Basic realm="Login Required"')
      .json({
        error: "Invalid credentials",
      });
  }

  req.user = user;

  next();
}

module.exports = authMiddleware;
