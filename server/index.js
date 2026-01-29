import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import landingRoutes from "./routes/landingRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

app.use("/api", landingRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
