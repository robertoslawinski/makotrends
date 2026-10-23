import mongoose from "mongoose";
import Prediction from "../models/Prediction.js";
import User from "../models/User.js";
import Vote from "../models/Vote.js";

export class SettlementError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = "SettlementError";
    this.statusCode = statusCode;
  }
}

export const settlePrediction = async ({
  predictionId,
  result,
  method = "manual",
  evidence = ""
}) => {
  if (!["yes", "no"].includes(result)) {
    throw new SettlementError("Result must be yes or no");
  }

  const session = await mongoose.startSession();

  try {
    await session.withTransaction(async () => {
      const prediction = await Prediction.findOne({
        _id: predictionId,
        status: { $ne: "resolved" }
      }).session(session);

      if (!prediction) {
        const exists = await Prediction.exists({ _id: predictionId }).session(session);
        throw new SettlementError(
          exists ? "Prediction is already resolved" : "Prediction not found",
          exists ? 409 : 404
        );
      }

      const votes = await Vote.find({ predictionId: prediction._id }).session(session);
      const pointsForCorrectVote = prediction.pointsValue || 10;
      const voteUpdates = [];
      const userUpdates = new Map();

      votes.forEach((vote) => {
        const isCorrect = vote.selectedOption === result;
        voteUpdates.push({
          updateOne: {
            filter: { _id: vote._id },
            update: {
              $set: {
                isCorrect,
                pointsEarned: isCorrect ? pointsForCorrectVote : 0
              }
            }
          }
        });

        const userId = vote.userId.toString();
        const increments = userUpdates.get(userId) || {
          totalPredictions: 0,
          correctPredictions: 0,
          points: 0
        };
        increments.totalPredictions += 1;
        if (isCorrect) {
          increments.correctPredictions += 1;
          increments.points += pointsForCorrectVote;
        }
        userUpdates.set(userId, increments);
      });

      if (voteUpdates.length > 0) {
        await Vote.bulkWrite(voteUpdates, { session });
      }

      if (userUpdates.size > 0) {
        await User.bulkWrite(
          Array.from(userUpdates.entries()).map(([userId, increments]) => ({
            updateOne: {
              filter: { _id: userId },
              update: { $inc: increments }
            }
          })),
          { session }
        );
      }

      prediction.status = "resolved";
      prediction.result = result;
      prediction.resolutionMethod = method;
      prediction.resolutionEvidence = evidence;
      prediction.resolvedAt = new Date();
      await prediction.save({ session });
    });

    return Prediction.findById(predictionId);
  } finally {
    await session.endSession();
  }
};
