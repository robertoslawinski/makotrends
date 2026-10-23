import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import Prediction from "../models/Prediction.js";
import { resolveAutomatically } from "../services/automaticResolutionService.js";
import { settlePrediction } from "../services/predictionSettlementService.js";

dotenv.config();

const runMaintenance = async () => {
  await connectDb();
  const now = new Date();

  const closed = await Prediction.updateMany(
    { status: "open", deadline: { $lte: now } },
    { $set: { status: "closed" } }
  );

  const automaticMarkets = await Prediction.find({
    status: "closed",
    resolutionDate: { $ne: null, $lte: now },
    "automaticResolution.enabled": true
  });

  const resolved = [];
  const failures = [];

  for (const market of automaticMarkets) {
    try {
      const resolution = await resolveAutomatically(market.automaticResolution);
      await settlePrediction({
        predictionId: market._id,
        result: resolution.result,
        method: "automatic",
        evidence: resolution.evidence
      });
      resolved.push({ id: market._id.toString(), title: market.title, result: resolution.result });
    } catch (error) {
      failures.push({ id: market._id.toString(), title: market.title, error: error.message });
    }
  }

  const awaitingReview = await Prediction.countDocuments({
    status: "closed",
    resolutionDate: { $ne: null, $lte: now },
    $or: [
      { automaticResolution: null },
      { "automaticResolution.enabled": { $ne: true } }
    ]
  });

  console.log("MakoTrends market maintenance completed");
  console.log(`Closed now: ${closed.modifiedCount}`);
  console.log(`Automatically resolved: ${resolved.length}`);
  console.log(`Awaiting editorial review: ${awaitingReview}`);
  resolved.forEach((item) => console.log(`Resolved ${item.result.toUpperCase()}: ${item.title}`));

  if (failures.length > 0) {
    failures.forEach((item) => console.error(`Failed: ${item.title}: ${item.error}`));
    throw new Error(`${failures.length} automatic resolution(s) failed`);
  }
};

runMaintenance()
  .catch((error) => {
    console.error("Market maintenance failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
