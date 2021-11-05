const express = require('express');
const router = express.Router();
const db = require('../models/index')
const User = db.sequelize.models.User;
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { CompareHash } = require('../helpers/auth/hash')


router.post('/login',
    body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Insert a valid email"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("Password length must be at least 6 characters"),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({
                error: errors.array()
            })
        } else {
            const { email, password } = req.body
            const user = await User.findOne({
                where: { email: email },
            });
            const isMatch = user && (await CompareHash(password, user.password));
            if (!isMatch) {
                res.json({
                    message: "{ok:false}"
                })
            }
            const token = jwt.sign({ email: user.email, firstName: user.firstName, lastName: user.lastName, roleId: user.roleId }, process.env.SECRET, {
                expiresIn: 60 * 60 * 24 * 30 // expira en 30 dias
            })
            res.send({ message: "Login Successful.", token })
        }

    }
);

module.exports = router;
