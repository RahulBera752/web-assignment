import mongoose from "mongoose";

const landingSchema = new mongoose.Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    about: {
      type: String,
      default: "",
    },
    why: {
      type: String,
      default: "",
    },
    companies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Landing", landingSchema);
