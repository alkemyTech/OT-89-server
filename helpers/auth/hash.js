const bcrypt = require("bcrypt");

// compares incoming password with one from the database
const CompareHash = async (password, hashedPassword) => await bcrypt.compare(password, hashedPassword);

