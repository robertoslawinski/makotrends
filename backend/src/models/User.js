import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 80
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"]
    },
    passwordHash: {
      type: String,
      required: true,
      select: false
    },
    points: {
      type: Number,
      default: 0,
      min: 0
    },
    correctPredictions: {
      type: Number,
      default: 0,
      min: 0
    },
    totalPredictions: {
      type: Number,
      default: 0,
      min: 0
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user"
    }
  },
  { timestamps: true }
);

userSchema.methods.comparePassword = function comparePassword(password) {
  return bcrypt.compare(password, this.passwordHash);
};

userSchema.methods.toJSON = function toJSON() {
  const user = this.toObject();
  delete user.passwordHash;
  return user;
};

export default mongoose.model("User", userSchema);
