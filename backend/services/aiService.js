const extractSkills = require("../utils/skillExtractor");

// Escape regex symbols
function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function analyzeResume(resumeText = "", jobDescription = "") {

  if (!resumeText || !jobDescription) {
    return {
      resumeSkills: [],
      jobSkills: [],
      matchedSkills: [],
      missingSkills: [],
      matchScore: 0,
      suggestions: ["Provide resume and job description"]
    };
  }

  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  const resumeSkills = extractSkills(resume);
  const jobSkills = extractSkills(job);

  let matchedSkills = [];
  let missingSkills = [];

  jobSkills.forEach((skill) => {

    // ✅ Escape special chars (fixes c++, c#, node.js etc.)
    const safeSkill = escapeRegex(skill);

    const regex = new RegExp(`\\b${safeSkill}\\b`, "i");

    if (regex.test(resume)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }

  });

  const matchScore = jobSkills.length === 0
    ? 0
    : Math.round((matchedSkills.length / jobSkills.length) * 100);

  let suggestions = [];

  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider learning: ${missingSkills.join(", ")}`
    );
  }

  if (matchScore < 60) {
    suggestions.push("Improve technical projects");
  }

  if (matchScore >= 80) {
    suggestions.push("Great profile! Apply now.");
  }

  if (suggestions.length === 0) {
    suggestions.push("Good profile. Keep improving.");
  }

  return {
    resumeSkills,
    jobSkills,
    matchedSkills,
    missingSkills,
    matchScore,
    suggestions
  };
}

module.exports = analyzeResume;
