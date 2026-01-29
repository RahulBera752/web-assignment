import express from "express";
import Landing from "../models/Landing.js";

const router = express.Router();

/* ================= GET CONTENT ================= */
router.get("/content", async (req, res) => {
  try {
    const data = await Landing.findOne();
    res.json(data);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ================= SAVE / UPDATE CONTENT ================= */
router.put("/content", async (req, res) => {
  try {
    console.log("PUT /api/content HIT");
    console.log("REQUEST BODY:", req.body);

    const updated = await Landing.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    console.log("SAVED TO DB:", updated);

    res.json(updated);
  } catch (err) {
    console.error("PUT ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
