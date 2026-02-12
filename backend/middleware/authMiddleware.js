const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {

  console.log("====== AUTH MIDDLEWARE ======");
  console.log("Headers:", req.headers);

  try {

    // Get Authorization header
    const authHeader = req.header("Authorization");

    console.log("Auth Header:", authHeader);

    if (!authHeader) {
      console.log("❌ No Authorization header");
      return res.status(401).json({ message: "No token" });
    }

    // Remove "Bearer "
    const token = authHeader.replace("Bearer ", "");

    console.log("Extracted Token:", token);

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded:", decoded);

    req.user = decoded.id;

    next();

  } catch (error) {

    console.log("❌ JWT ERROR:", error.message);

    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
