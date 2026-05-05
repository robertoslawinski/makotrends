import express from "express";
import { login, signup, verify } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", protect, verify);

export default router;
