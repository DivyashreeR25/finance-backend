const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  try {
    console.log("Incoming Auth Header:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      console.log("No token found");
      return res.status(401).json({ message: "Unauthorized - No Token" });
    }

    console.log("Token extracted:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("Token verification failed:", error.message);
    return res.status(401).json({ message: "Unauthorized - Invalid Token" });
  }
};

module.exports = protect;