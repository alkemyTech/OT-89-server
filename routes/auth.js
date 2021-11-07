const express = require('express');
const router = express.Router();
const {validateLogin} = require('../auth/expressValidator');
const {login}= require('../servises/login');
const { body, validationResult } = require('express-validator')
const { Hash } = require('../helpers/auth/hash')
const generateToken = require('../helpers/auth/generateToken')


// db click
const User = db.sequelize.models.User

router.post('/login',validateLogin,(req, res) => {login});

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


router.get('/me', isAuthenticated, async (req, res) => { 

    const { userId } = req.user.token

    try {
        const data = await User.findByPk(userId)        
        if(data.dataValues !== undefined && data.dataValues !== null) {
            const { firstName, lastName, email } = data.dataValues
            res.status(200).json({
                message: "Datos del user",
                data: {
                    firstName,
                    lastName, 
                    email
                } 
            })    
        } else {
            res.status(204).json({
                message: "No hay datos"
            })
        }

    } catch (error) {
        res.status(404).json({message: error})        
    }
    

})

module.exports = router
