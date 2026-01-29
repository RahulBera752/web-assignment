import mongoose from "mongoose";

const landingSchema = new mongoose.Schema({
  businessName: String,
  about: String,
  why: String,
  companies: [String],
});

export default mongoose.model("Landing", landingSchema);
