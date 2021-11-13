const IsAdmin = (req, res, next) => {
  if (req.user.roleId !== 1) {
    res.status(403).json({
      message: "User is not authorized",
    });
  }
  next();
};

module.exports = IsAdmin;