import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "../config/db.js";
import User from "../models/User.js";

dotenv.config();

const adminEmail = process.env.ADMIN_EMAIL;
const adminPassword = process.env.ADMIN_PASSWORD;

const resetAdmin = async () => {
  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD are required");
  }

  if (adminPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters");
  }

  await connectDb();

  const passwordHash = await bcrypt.hash(adminPassword, 12);
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

  console.log("Admin user is ready");
  console.log(`Admin email: ${admin.email}`);
};

resetAdmin()
  .catch((error) => {
    console.error("Admin reset failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
