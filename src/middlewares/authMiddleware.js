import jwt from "../utils/jwt.js"

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    req.user = jwt.verifyToken(token);
    next();
  } catch {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default authMiddleware