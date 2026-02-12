const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {

    console.log("=== AUTH MIDDLEWARE ===");

    const authHeader = req.header("Authorization");
    console.log("Auth Header:", authHeader);

    if (!authHeader) {
      console.log("No auth header");
      return res.status(401).json({ message: "No token" });
    }

    const token = authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      console.log("Token missing after split");
      return res.status(401).json({ message: "Invalid format" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded User:", decoded);

    req.user = decoded.id;

    next();

  } catch (error) {
    console.log("JWT ERROR:", error.message);

    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
