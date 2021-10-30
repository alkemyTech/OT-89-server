const express = require('express');
const { body, validationResult } = require('express-validator')
const { Hash } = require('../helpers/auth/hash')
const generateToken = require('../helpers/auth/generateToken')

// db click
// const User = db.sequelize.models.user

const router = express.Router()

router.post("/auth/register", 
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
            })
            .then(user => {
            if (user.email === email) {
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
        if(!errors.isEmpty()){
            return res.json({
                error: errors.array()
            })
        } else {
            const { email, password, firstName, lastName } = req.body
            // we hash the user's password
            const hashedPassword = await Hash(password)
            if(hashedPassword) {
                const userCreation = await User.create({
                    email: email,
                    password: hashedPassword,
                    firstName: firstName, 
                    lastName: lastName
                },{
                    validation: true, 
                    silent: true, // this set updateAt null
                    fields: ["email", "password", "firstName", "lastName"]
                })
                if(userCreation){
                    const { userId } = await userCreation 
                    // we generate the token for the authentication
                    const token = await generateToken(userId)
                    res.json({
                        message: "¡User created successfully!",
                        userData: {
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        },
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

module.exports = router