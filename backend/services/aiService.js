const extractSkills = require("../utils/skillExtractor");

function analyzeResume(resumeText, jobDesc) {

  const resumeSkills = extractSkills(resumeText || "");
  const jobSkills = extractSkills(jobDesc || "");

  const matched = resumeSkills.filter(skill =>
    jobSkills.includes(skill)
  );

  const missing = jobSkills.filter(skill =>
    !resumeSkills.includes(skill)
  );

  const score = jobSkills.length === 0
    ? 0
    : Math.round((matched.length / jobSkills.length) * 100);

  // Suggestions
  let suggestions = [];

  if (missing.length > 0) {
    suggestions.push(
      `Consider learning: ${missing.join(", ")}`
    );
  }

  if (score < 60) {
    suggestions.push("Improve technical projects");
  }

  if (score < 80) {
    suggestions.push("Add certifications");
  }

  if (score >= 80) {
    suggestions.push("Great profile! Apply now.");
  }

  return {
    resumeSkills,
    jobSkills,
    matchedSkills: matched,
    missingSkills: missing,
    matchScore: score,
    suggestions
  };
}

module.exports = analyzeResume;
