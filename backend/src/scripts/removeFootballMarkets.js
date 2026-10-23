import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import Prediction from "../models/Prediction.js";
import Vote from "../models/Vote.js";

dotenv.config();

const footballCategories = ["Brasileirao 2026", "Libertadores 2026", "Transfers"];
const confirmed = process.argv.includes("--confirm");

const removeFootballMarkets = async () => {
  if (!confirmed) {
    throw new Error("Deletion requires the --confirm flag");
  }

  await connectDb();

  const markets = await Prediction.find({ category: { $in: footballCategories } })
    .select("_id title category")
    .lean();
  const marketIds = markets.map((market) => market._id);
  const voteCount = marketIds.length
    ? await Vote.countDocuments({ predictionId: { $in: marketIds } })
    : 0;

  if (voteCount > 0) {
    throw new Error(
      `Safety stop: ${voteCount} vote(s) are attached to the football markets`
    );
  }

  const result = await Prediction.deleteMany({ _id: { $in: marketIds } });

  console.log("MakoTrends football-market cleanup completed");
  console.log(`Deleted markets: ${result.deletedCount}`);
  console.log("Deleted votes: 0");
  console.log("No users, points, or non-football markets were changed.");
};

removeFootballMarkets()
  .catch((error) => {
    console.error("Football-market cleanup failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
