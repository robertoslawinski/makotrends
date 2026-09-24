import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import { launchPredictions } from "./data/launchPredictions.js";
import Prediction from "./models/Prediction.js";
import User from "./models/User.js";
import Vote from "./models/Vote.js";

dotenv.config();

const adminEmail = process.env.SEED_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

const runSeed = async () => {
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "ADMIN_EMAIL and ADMIN_PASSWORD are required before running seed"
    );
  }

  if (adminPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  await connectDb();

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await User.updateMany(
    {},
    {
      $set: {
        points: 0,
        correctPredictions: 0,
        totalPredictions: 0
      }
    }
  );

  const admin = await User.findOneAndUpdate(
    { email: adminEmail },
    {
      $set: {
        name: "MakoTrends Admin",
        passwordHash,
        role: "admin"
      },
      $setOnInsert: {
        points: 0,
        correctPredictions: 0,
        totalPredictions: 0
      }
    },
    { new: true, upsert: true, runValidators: true }
  );

  await Vote.deleteMany({});
  await Prediction.deleteMany({});

  await Prediction.insertMany(
    launchPredictions.map((prediction) => ({
      ...prediction,
      createdBy: admin._id
    }))
  );

  console.log("Seed complete");
  console.log(`Admin email: ${adminEmail}`);
  console.log(`Predictions created: ${launchPredictions.length}`);
};

runSeed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
