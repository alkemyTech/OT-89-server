const bcrypt = require("bcrypt");

// encriptador
const encrypt = async (password) => encriptedPassword = await bcrypt.hash(password, 12);

// desencriptador
const desencrypt = async (password, encriptedPassword) => comparation = await bcrypt.compare(password, encriptedPassword);

module.exports = {
  encrypt,
  desencrypt,
};
