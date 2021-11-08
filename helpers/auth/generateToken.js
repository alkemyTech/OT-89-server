const jwt = require("jsonwebtoken");

const generateToken = (user) => {
    const token = jwt.sign({ userId: user.userId, email: user.email, firstName: user.firstName, lastName: user.lastName, roleId: user.roleId }, process.env.JWT_SECRET_KEY, {
        expiresIn: 60 * 60 * 24 * 30 // expira en 30
    })

    return token;
};

module.exports = generateToken;