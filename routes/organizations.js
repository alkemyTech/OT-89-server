const express = require('express');
const router = express.Router();
const db = require('../models/index')
const Organizations = db.sequelize.models.organization;

/* GET home page. */
router.get( async (req, res, next) => {
    const organization = await Organizations.findAll()
    res.json(organization)
});

module.exports = router;