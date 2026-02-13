// utils/skillExtractor.js

const SKILLS = [
  "java",
  "javascript",
  "python",
  "c",
  "c++",
  "react",
  "node",
  "mongodb",
  "express",
  "html",
  "css",
  "sql",
  "git",
  "docker",
  "aws",
  "machine learning",
  "ai",
  "data science"
];

function extractSkills(text) {

  if (!text) return [];

  // Convert to lowercase
  text = text.toLowerCase();

  const foundSkills = [];

  for (let skill of SKILLS) {

    // Create word-boundary regex
    const pattern = new RegExp(`\\b${skill.replace("+", "\\+")}\\b`, "i");

    if (pattern.test(text)) {
      foundSkills.push(skill);
    }
  }

  return foundSkills;
}

module.exports = extractSkills;
