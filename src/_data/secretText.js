const dotenv = require("dotenv");

module.exports = () => {
  dotenv.config({ override: true });
  return loadSecretData();
};

function loadSecretData() {
  const chunks = [];
  for (let i = 1; ; i++) {
    const chunk = process.env[`TEXT${i}`];
    if (chunk !== undefined) {
      chunks.push(chunk.trim());
    } else {
      break;
    }
  }
  return chunks.join("\n").split("\n");
}
