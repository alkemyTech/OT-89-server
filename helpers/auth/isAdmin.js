const IsAdmin = (req, res, next) => {
  if (req.user.roleId !== 1) {
    res.status(403).send({
      message: "User is not authorized",
    });
  } else {
    next();
  }
};

module.exports = IsAdmin;
