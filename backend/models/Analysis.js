const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  resumeSkills: [String],
  jobSkills: [String],
  matchedSkills: [String],
  missingSkills: [String],

  matchScore: Number,
  suggestions: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Prevent model overwrite error
module.exports =
  mongoose.models.Analysis ||
  mongoose.model("Analysis", analysisSchema);
