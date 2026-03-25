import mongoose from "mongoose";

const flowSchema = new mongoose.Schema(
  {
    prompt: String,
    result: String,
  },
  { timestamps: true },
);

export default mongoose.model("Flow", flowSchema);
