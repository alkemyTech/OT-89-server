const bcrypt = require("bcrypt");

// hashes a new password
const Hash = async (password) => await bcrypt.hashSync(password, 12);

// compares incoming password with one from the database
const CompareHash = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

module.exports = {
  Hash,
  CompareHash,
}
