const bcrypt = require("bcrypt");


const saltRounds = 12

// hashes a new password
const Hash = async (password) => await bcrypt.hash(password, saltRounds);
const HashSync = async (password) => await bcrypt.hashSync(password, saltRounds);

// compares incoming password with one from the database
const CompareHash = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

module.exports = {
  Hash,
  HashSync,
  CompareHash,
};