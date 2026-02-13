const skills = [
  "java",
  "javascript",
  "node",
  "react",
  "mongodb",
  "express",
  "python",
  "aws",
  "git",
  "docker",
  "html",
  "css",
  "sql"
];

function extractSkills(text = "") {

  let found = [];

  skills.forEach((skill) => {

    const regex = new RegExp(`\\b${skill}\\b`, "i");

    if (regex.test(text)) {
      found.push(skill);
    }

  });

  return found;
}

module.exports = extractSkills;
