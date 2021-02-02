const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    res.status(401).json({ msg: "no token, authorization denied" });
  }
  try {
    //verify token

    const decoded = jwt.verify(token, "process.env.jwtSecret");
    //Add user from payload

    req.user = decoded;

    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
