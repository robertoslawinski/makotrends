import Prediction from "../models/Prediction.js";
import Vote from "../models/Vote.js";
import {
  SettlementError,
  settlePrediction
} from "../services/predictionSettlementService.js";

const closeExpiredPredictions = async () => {
  await Prediction.updateMany(
    { status: "open", deadline: { $lte: new Date() } },
    { $set: { status: "closed" } }
  );
};

const validatePredictionInput = ({
  title,
  description,
  category,
  deadline,
  resolutionDate,
  resolutionCriteria,
  resolutionSource,
  pointsValue
}) => {
  if (!title || !description || !category || !deadline) {
    throw new Error("Title, description, category and deadline are required");
  }

  if (!resolutionCriteria || !resolutionSource) {
    throw new Error("Resolution criteria and source are required");
  }

  const deadlineDate = new Date(deadline);
  if (Number.isNaN(deadlineDate.getTime())) {
    throw new Error("Deadline must be a valid date");
  }

  if (pointsValue !== undefined) {
    const parsedPoints = Number(pointsValue);
    if (!Number.isInteger(parsedPoints) || parsedPoints < 1 || parsedPoints > 100) {
      throw new Error("Points value must be an integer from 1 to 100");
    }
  }

  const parsedResolutionDate = resolutionDate ? new Date(resolutionDate) : null;
  if (parsedResolutionDate && Number.isNaN(parsedResolutionDate.getTime())) {
    throw new Error("Resolution date must be a valid date");
  }

  if (parsedResolutionDate && parsedResolutionDate <= deadlineDate) {
    throw new Error("Resolution date must be after the deadline");
  }

  return { deadlineDate, resolutionDate: parsedResolutionDate };
};

const withVoteStats = async (prediction, viewerId = null) => {
  const [stats, viewerVote] = await Promise.all([
    Vote.aggregate([
      { $match: { predictionId: prediction._id } },
      { $group: { _id: "$selectedOption", count: { $sum: 1 } } }
    ]),
    viewerId
      ? Vote.findOne({ predictionId: prediction._id, userId: viewerId })
      : Promise.resolve(null)
  ]);

  const counts = { yes: 0, no: 0 };
  stats.forEach((item) => {
    counts[item._id] = item.count;
  });
  const totalVotes = counts.yes + counts.no;

  return {
    ...prediction.toObject(),
    voteCounts: counts,
    votePercentages: {
      yes: totalVotes ? Math.round((counts.yes / totalVotes) * 100) : 0,
      no: totalVotes ? Math.round((counts.no / totalVotes) * 100) : 0
    },
    totalVotes,
    viewerVote
  };
};

export const listPredictions = async (req, res, next) => {
  try {
    await closeExpiredPredictions();

    const { status, category } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;

    const predictions = await Prediction.find(filter)
      .populate("createdBy", "name")
      .sort({ createdAt: -1 });

    const enrichedPredictions = await Promise.all(
      predictions.map((prediction) => withVoteStats(prediction, req.user?._id))
    );

    res.json(enrichedPredictions);
  } catch (error) {
    next(error);
  }
};

export const getPrediction = async (req, res, next) => {
  try {
    await closeExpiredPredictions();

    const prediction = await Prediction.findById(req.params.id).populate(
      "createdBy",
      "name"
    );

    if (!prediction) {
      res.status(404);
      throw new Error("Prediction not found");
    }

    res.json(await withVoteStats(prediction, req.user?._id));
  } catch (error) {
    next(error);
  }
};

export const createPrediction = async (req, res, next) => {
  try {
    const { deadlineDate, resolutionDate } = validatePredictionInput(req.body);

    if (deadlineDate <= new Date()) {
      res.status(400);
      throw new Error("Deadline must be in the future");
    }

    const prediction = await Prediction.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      deadline: deadlineDate,
      resolutionDate,
      resolutionSource: req.body.resolutionSource,
      resolutionCriteria: req.body.resolutionCriteria,
      pointsValue: req.body.pointsValue || 10,
      createdBy: req.user._id
    });

    res.status(201).json(prediction);
  } catch (error) {
    next(error);
  }
};

export const updatePrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      res.status(404);
      throw new Error("Prediction not found");
    }

    if (prediction.status === "resolved") {
      res.status(400);
      throw new Error("Resolved predictions cannot be edited");
    }

    const updates = {};
    [
      "title",
      "description",
      "category",
      "status",
      "resolutionSource",
      "resolutionCriteria",
      "pointsValue"
    ].forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (req.body.deadline !== undefined) {
      const deadlineDate = new Date(req.body.deadline);
      if (Number.isNaN(deadlineDate.getTime())) {
        res.status(400);
        throw new Error("Deadline must be a valid date");
      }
      updates.deadline = deadlineDate;
    }

    if (req.body.resolutionDate !== undefined) {
      const resolutionDate = req.body.resolutionDate
        ? new Date(req.body.resolutionDate)
        : null;
      if (resolutionDate && Number.isNaN(resolutionDate.getTime())) {
        res.status(400);
        throw new Error("Resolution date must be a valid date");
      }
      updates.resolutionDate = resolutionDate;
    }

    const effectiveDeadline = updates.deadline || prediction.deadline;
    const effectiveResolutionDate =
      updates.resolutionDate !== undefined
        ? updates.resolutionDate
        : prediction.resolutionDate;

    if (effectiveResolutionDate && effectiveResolutionDate <= effectiveDeadline) {
      res.status(400);
      throw new Error("Resolution date must be after the deadline");
    }

    const updatedPrediction = await Prediction.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedPrediction);
  } catch (error) {
    next(error);
  }
};

export const deletePrediction = async (req, res, next) => {
  try {
    const prediction = await Prediction.findById(req.params.id);

    if (!prediction) {
      res.status(404);
      throw new Error("Prediction not found");
    }

    await Vote.deleteMany({ predictionId: prediction._id });
    await prediction.deleteOne();

    res.json({ message: "Prediction deleted" });
  } catch (error) {
    next(error);
  }
};

export const resolvePrediction = async (req, res, next) => {
  try {
    const { result } = req.body;
    const prediction = await settlePrediction({
      predictionId: req.params.id,
      result,
      method: "manual",
      evidence: "Resolved by a MakoTrends administrator."
    });
    res.json(await withVoteStats(prediction, req.user._id));
  } catch (error) {
    if (error instanceof SettlementError) {
      res.status(error.statusCode);
    }
    next(error);
  }
};
