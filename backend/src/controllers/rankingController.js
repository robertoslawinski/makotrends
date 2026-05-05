import User from "../models/User.js";

export const getRanking = async (_req, res, next) => {
  try {
    const users = await User.find()
      .select("name points correctPredictions totalPredictions")
      .sort({ points: -1, correctPredictions: -1, createdAt: 1 })
      .limit(100);

    res.json(
      users.map((user, index) => ({
        rank: index + 1,
        id: user._id,
        name: user.name,
        points: user.points,
        correctPredictions: user.correctPredictions,
        totalPredictions: user.totalPredictions,
        accuracyRate: user.totalPredictions
          ? Math.round((user.correctPredictions / user.totalPredictions) * 100)
          : 0
      }))
    );
  } catch (error) {
    next(error);
  }
};
