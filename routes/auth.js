const express = require('express');
const router = express.Router();
const db = require('../models/index')
const User = db.sequelize.models.User;
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const { CompareHash, Hash } = require('../helpers/auth/hash');
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const generateToken = require('../helpers/auth/generateToken');


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
            const token = await generateToken(user)
            res.send({ message: "Login Successful.", token })
        }
    }
);

router.post("/register",
    // Validate firstName
    body("firstName")
        .isLength({ min: 3 })
        .not()
        .trim()
        .isEmpty().withMessage("You have to declare your firstname")
        .escape(),
    // Validate lastname
    body("lastName")
        .not()
        .isEmpty().withMessage("You have to declare your lastname")
        .trim()
        .escape(),
    // Validate email
    body("email")
        .isEmail()
        .normalizeEmail()
        .withMessage("Insert a valid email")
     .custom(email => {
         // We validate the if the email is already in use
         return User.findOne({
             where: {
                 email
             }
         }).then(user => {
                if (user) {
                    return Promise.reject('E-mail already in use' + email);
                } else {
                    return true
                }
            });
     }),
    // Validate password > 6 characters
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
            const { email, password, firstName, lastName } = req.body
            // we hash the user's password
            const hashedPassword = await Hash(password)
            if (hashedPassword) {
                const userCreation = await User.create({
                    email: email,
                    password: hashedPassword,
                    firstName: firstName,
                    lastName: lastName
                }, {
                    validation: true,
                    fields: ["email", "password", "firstName", "lastName"]
                })
                if (userCreation) {
                    const data = await userCreation
                    // we generate the token for the authentication
                    const token = generateToken(data)
                    res.json({
                        message: "¡User created successfully!",
                        token: token
                    })
                } else {
                    res.json({
                        message: "Please try again later"
                    })
                }
            }
        }
    })

router.get('/me', IsAuthenticated, async (req, res) => {

    const { roleId, firstName, lastName, email, userId } = req.user

    try {
        res.status(200).json({
            message: "Datos del user",
            data: {
                userId,
                firstName,
                lastName,
                email,
                roleId
            }
        })
    } catch (error) {
        res.status(404).json({ message: error })
    }

})

module.exports = router
