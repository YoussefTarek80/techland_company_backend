const jwt = require("jsonwebtoken");
require("dotenv").config();

const adminAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Token missing or invalid" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);


    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized. Invalid token." });
  }
};

module.exports = adminAuth;