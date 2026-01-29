import express from "express";
import Landing from "../models/Landing.js";

const router = express.Router();

/* GET CONTENT */
router.get("/content", async (req, res) => {
  try {
    const data = await Landing.findOne();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to load content" });
  }
});

/* SAVE / UPDATE CONTENT */
router.put("/content", async (req, res) => {
  try {
    const updated = await Landing.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to save content" });
  }
});

export default router;
