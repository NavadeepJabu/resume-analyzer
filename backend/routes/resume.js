const Analysis = require("../models/Analysis");
const analyzeResume = require("../services/aiService");
const express = require("express");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const Resume = require("../models/Resume");

const router = express.Router();

/* ======================
   UPLOAD & PARSE RESUME
====================== */
router.post(
  "/upload",
  authMiddleware,
  upload.single("resume"),
  async (req, res) => {
    try {

      // ✅ Check if file exists
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const filePath = req.file.path;

      const dataBuffer = fs.readFileSync(filePath);

      const pdfData = await pdfParse(dataBuffer);

      const resume = new Resume({
        userId: req.user,   // ✅ FIXED
        fileName: req.file.originalname,
        filePath,
        extractedText: pdfData.text
      });

      await resume.save();

      res.json({
  message: "Resume uploaded and parsed successfully",
  fullText: pdfData.text
});

    } catch (error) {
      console.error("UPLOAD ERROR:", error);

      res.status(500).json({
        message: "Resume upload failed",
        error: error.message
      });
    }
  }
);


/* ======================
   AI MATCHING + SAVE
====================== */
router.post("/analyze", authMiddleware, async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body || {};

    const result = analyzeResume(resumeText, jobDescription);

    // Save to DB
    /*console.log("Analysis Type:", typeof Analysis);
    console.log("Analysis Value:", Analysis);*/

    const analysis = new Analysis({
      userId: req.user,

      resumeSkills: result.resumeSkills,
      jobSkills: result.jobSkills,
      matchedSkills: result.matchedSkills,
      missingSkills: result.missingSkills,

      matchScore: result.matchScore,
      suggestions: result.suggestions
    });

    await analysis.save();

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Analysis failed" });
  }
});

/* ======================
   GET ANALYSIS HISTORY
====================== */

router.get("/history", authMiddleware, async (req, res) => {
  try {

    const history = await Analysis
      .find({ userId: req.user })
      .sort({ createdAt: -1 });

    res.json(history);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "History fetch failed" });
  }
});


module.exports = router;
