import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "secretary",
    },
    lastLogin: {
      type: Date,
    },
    isLocked: {
      type: Boolean,
      default: false,
    },
    lockUntil: {
      type: Date,
    },
    loginAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("Users", userSchema);

export default UserModel;
