import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Authentication required");
    }

    const token = header.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401);
      throw new Error("User no longer exists");
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(res.statusCode === 200 ? 401 : res.statusCode);
    next(error);
  }
};

export const optionalAuth = async (req, _res, next) => {
  try {
    const header = req.headers.authorization;

    if (header?.startsWith("Bearer ")) {
      const token = header.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    }

    next();
  } catch {
    next();
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    res.status(403);
    return next(new Error("Admin access required"));
  }

  next();
};
