import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDb } from "./config/db.js";
import Prediction from "./models/Prediction.js";
import User from "./models/User.js";
import Vote from "./models/Vote.js";

dotenv.config();

const adminEmail = process.env.SEED_ADMIN_EMAIL || process.env.ADMIN_EMAIL;
const adminPassword = process.env.SEED_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;

const daysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  date.setHours(18, 0, 0, 0);
  return date;
};

const predictions = [
  {
    title: "Will AI agents become mainstream in 2026?",
    description:
      "This market resolves yes if AI agents become widely adopted by consumers or businesses during 2026.",
    category: "Technology",
    deadline: daysFromNow(30),
    status: "open"
  },
  {
    title: "Will a new social app reach 50M users this year?",
    description:
      "Resolves yes if a newly launched social app publicly reports or credibly reaches 50 million users before year end.",
    category: "Social Media",
    deadline: daysFromNow(45),
    status: "open"
  },
  {
    title: "Will Bitcoin hit a new all-time high this cycle?",
    description:
      "Resolves yes if Bitcoin trades above its previous all-time high on a major exchange before the deadline.",
    category: "Crypto",
    deadline: daysFromNow(60),
    status: "open"
  },
  {
    title: "Will foldable phones gain mainstream traction?",
    description:
      "Resolves yes if foldable phones materially increase market share and become a common flagship category.",
    category: "Consumer Tech",
    deadline: daysFromNow(90),
    status: "open"
  },
  {
    title: "Will short-form video remain the dominant creator format?",
    description:
      "Resolves yes if short-form video continues to dominate creator growth and platform investment through the deadline.",
    category: "Culture",
    deadline: daysFromNow(15),
    status: "open"
  }
];

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
    predictions.map((prediction) => ({
      ...prediction,
      createdBy: admin._id
    }))
  );

  console.log("Seed complete");
  console.log(`Admin email: ${adminEmail}`);
  console.log(`Predictions created: ${predictions.length}`);
};

runSeed()
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exitCode = 1;
  })
  .finally(async () => {
    await mongoose.connection.close();
  });
