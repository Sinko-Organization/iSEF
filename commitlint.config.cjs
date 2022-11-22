module.exports = {
  extends: ["gitmoji"],
  rules: {
    "subject-empty": [0, "always", 72],
    "type-empty": [0, "always", 72],
    "type-enum": [0, "always", 72],
    "type-case": [2, "always", "lower-case"],
    "body-case": [2, "always", "lower-case"],
  },
};
