const express = require('express');
const router = express.Router();
const db = require('../models/index')
const Organizations = db.sequelize.models.organization;

/* GET home page. */
router.get( async (req, res, next) => {
    const {name, image, phone, address, welcomeText, facebook, linkedin, instagram} = await Organizations.findAll()
    res.send({name, image, phone, address, welcomeText, facebook, linkedin, instagram})
});

module.exports = router;