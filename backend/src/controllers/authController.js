import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

const serializeAuth = (user) => ({
  token: signToken(user),
  user
});

export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Name, email and password are required");
    }

    if (password.length < 8) {
      res.status(400);
      throw new Error("Password must be at least 8 characters");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409);
      throw new Error("Email is already registered");
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash });

    res.status(201).json(serializeAuth(user));
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400);
      throw new Error("Email and password are required");
    }

    const user = await User.findOne({ email }).select("+passwordHash");
    if (!user || !(await user.comparePassword(password))) {
      res.status(401);
      throw new Error("Invalid email or password");
    }

    res.json(serializeAuth(user));
  } catch (error) {
    next(error);
  }
};

export const verify = async (req, res) => {
  res.json({ user: req.user });
};
