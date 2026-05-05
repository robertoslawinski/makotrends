import Vote from "../models/Vote.js";

export const getProfile = async (req, res, next) => {
  try {
    const votes = await Vote.find({ userId: req.user._id })
      .populate("predictionId", "title category deadline status result")
      .sort({ createdAt: -1 });

    res.json({
      user: req.user,
      accuracyRate: req.user.totalPredictions
        ? Math.round((req.user.correctPredictions / req.user.totalPredictions) * 100)
        : 0,
      history: votes
    });
  } catch (error) {
    next(error);
  }
};
