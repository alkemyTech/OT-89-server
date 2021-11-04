const jwt = require("jsonwebtoken");

const generateToken = async (id) => {
  const token = await jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  });

  return token;
};

module.exports = generateToken;
