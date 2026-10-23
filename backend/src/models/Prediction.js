import mongoose from "mongoose";

const automaticResolutionSchema = new mongoose.Schema(
  {
    enabled: {
      type: Boolean,
      default: false
    },
    provider: {
      type: String,
      enum: ["coinbase-candle"],
      required: true
    },
    symbol: {
      type: String,
      trim: true,
      required: true
    },
    observationTime: {
      type: Date,
      required: true
    },
    operator: {
      type: String,
      enum: ["gt", "gte", "lt", "lte"],
      required: true
    },
    threshold: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const predictionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 140
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1500
    },
    category: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60
    },
    options: {
      type: [String],
      default: ["yes", "no"],
      validate: {
        validator: (options) =>
          Array.isArray(options) &&
          options.length === 2 &&
          options.includes("yes") &&
          options.includes("no"),
        message: "Options must be yes and no"
      }
    },
    deadline: {
      type: Date,
      required: true
    },
    resolutionDate: {
      type: Date,
      default: null
    },
    resolutionSource: {
      type: String,
      trim: true,
      maxlength: 300,
      default: ""
    },
    resolutionCriteria: {
      type: String,
      trim: true,
      maxlength: 1800,
      default: ""
    },
    pointsValue: {
      type: Number,
      default: 10,
      min: 1,
      max: 100
    },
    status: {
      type: String,
      enum: ["open", "closed", "resolved"],
      default: "open"
    },
    result: {
      type: String,
      enum: ["yes", "no", null],
      default: null
    },
    automaticResolution: {
      type: automaticResolutionSchema,
      default: null
    },
    resolutionEvidence: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: ""
    },
    resolutionMethod: {
      type: String,
      enum: ["manual", "automatic", null],
      default: null
    },
    resolvedAt: {
      type: Date,
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

predictionSchema.index({ status: 1, deadline: 1 });
predictionSchema.index({ status: 1, resolutionDate: 1 });
predictionSchema.index({ category: 1 });

export default mongoose.model("Prediction", predictionSchema);
