import express from "express";
import { generateProject } from "../utils/aiGenerator.js";
import { zipProject } from "../utils/zipProject.js";
import fs from "fs";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt required" });

    // Step 1: Generate files using AI
    const files = await generateProject(prompt);

    // Step 2: Zip the files
    const zipPath = await zipProject(files);

    // Step 3: Return download link (for now, just local path)
    res.json({ download: zipPath });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
