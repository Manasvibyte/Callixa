import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  // Expected format: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Access denied. Token missing.",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token using secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Store logged-in user details for later use
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;
