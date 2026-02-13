const extractSkills = require("../utils/skillExtractor");

function analyzeResume(resumeText = "", jobDescription = "") {

  // Safety check
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

  // Convert to lowercase
  const resume = resumeText.toLowerCase();
  const job = jobDescription.toLowerCase();

  // Extract skills
  const resumeSkills = extractSkills(resume);
  const jobSkills = extractSkills(job);

  let matchedSkills = [];
  let missingSkills = [];

  // ✅ MAIN FIX: Word boundary regex
  jobSkills.forEach((skill) => {

    const regex = new RegExp(`\\b${skill}\\b`, "i");

    if (regex.test(resume)) {
      matchedSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }

  });

  // Score
  const matchScore = jobSkills.length === 0
    ? 0
    : Math.round((matchedSkills.length / jobSkills.length) * 100);

  // Suggestions
  let suggestions = missingSkills.map(
    (s) => `Consider learning: ${s}`
  );

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
