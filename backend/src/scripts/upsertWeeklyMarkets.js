import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import { weeklyPredictions } from "../data/weeklyPredictions.js";
import Prediction from "../models/Prediction.js";
import User from "../models/User.js";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;

const upsertWeeklyMarkets = async () => {
  if (!adminEmail) {
    throw new Error("ADMIN_EMAIL is required");
  }

  await connectDb();

  const admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    throw new Error("Admin user not found. Run npm run admin:reset --prefix backend first.");
  }

  let created = 0;
  let updated = 0;

  for (const market of weeklyPredictions) {
    const existing = await Prediction.findOne({ title: market.title });

    if (existing) {
      await Prediction.updateOne(
        { _id: existing._id },
        {
          $set: {
            description: market.description,
            category: market.category,
            deadline: market.deadline,
            resolutionDate: market.resolutionDate,
            resolutionSource: market.resolutionSource,
            resolutionCriteria: market.resolutionCriteria,
            pointsValue: market.pointsValue,
            status: existing.status === "resolved" ? existing.status : market.status
          }
        },
        { runValidators: true }
      );
      updated += 1;
    } else {
      await Prediction.create({
        ...market,
        createdBy: admin._id
      });
      created += 1;
    }
  }

  console.log("Weekly markets are ready");
  console.log(`Created: ${created}`);
  console.log(`Updated: ${updated}`);
  console.log("No users, votes, points, or history were deleted.");
};

upsertWeeklyMarkets()
  .catch((error) => {
    console.error("Weekly market upsert failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
