const skills = [
  "javascript",
  "node",
  "express",
  "mongodb",
  "react",
  "python",
  "java",
  "c++",
  "machine learning",
  "deep learning",
  "ai",
  "sql",
  "aws",
  "docker",
  "git",
  "html",
  "css"
];

function extractSkills(text) {
  if (!text) return [];

  const lowerText = text.toLowerCase();

  return skills.filter(skill =>
    lowerText.includes(skill)
  );
}

module.exports = extractSkills;

