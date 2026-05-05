import Prediction from "../models/Prediction.js";
import Vote from "../models/Vote.js";

export const voteOnPrediction = async (req, res, next) => {
  try {
    const { selectedOption } = req.body;

    if (!["yes", "no"].includes(selectedOption)) {
      res.status(400);
      throw new Error("Selected option must be yes or no");
    }

    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      res.status(404);
      throw new Error("Prediction not found");
    }

    if (prediction.status !== "open" || prediction.deadline <= new Date()) {
      if (prediction.status === "open") {
        prediction.status = "closed";
        await prediction.save();
      }

      res.status(400);
      throw new Error("Voting is closed for this prediction");
    }

    const existingVote = await Vote.findOne({
      userId: req.user._id,
      predictionId: prediction._id
    });

    if (existingVote) {
      res.status(409);
      throw new Error("You have already voted on this prediction");
    }

    const vote = await Vote.create({
      userId: req.user._id,
      predictionId: prediction._id,
      selectedOption
    });

    res.status(201).json(vote);
  } catch (error) {
    next(error);
  }
};
