const userModel = require("../models/user");
const { desencrypt } = require("../auth/encrypt");

const login = async ({ email, password }) => {
  const user = await userModel.findOne({
    where: { email: email },
  });

  const isMatch = user && (await desencrypt(password, user.password));
  if (!isMatch) {
    return JSON.stringify({ ok: false });
  }
  return { user };
};

module.exports = login;
