const bcrypt = require("bcrypt");

// desencriptador
const desencrypt = async (password, encriptedPassword) =>
  (comparation = await bcrypt.compare(password, encriptedPassword));

module.exports = {
  desencrypt,
};
