import express from "express";
import {
  createPrediction,
  deletePrediction,
  getPrediction,
  listPredictions,
  resolvePrediction,
  updatePrediction
} from "../controllers/predictionController.js";
import { voteOnPrediction } from "../controllers/voteController.js";
import { adminOnly, optionalAuth, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", optionalAuth, listPredictions);
router.get("/:id", optionalAuth, getPrediction);
router.post("/", protect, adminOnly, createPrediction);
router.put("/:id", protect, adminOnly, updatePrediction);
router.delete("/:id", protect, adminOnly, deletePrediction);
router.put("/:id/resolve", protect, adminOnly, resolvePrediction);
router.post("/:id/vote", protect, voteOnPrediction);

export default router;
