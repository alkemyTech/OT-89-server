const express = require('express');
const router = express.Router();
const Organizations = require('../models/organization')

/* GET home page. */
router.get('/:id/public', async (req, res, next) => {
    const {name, image, phone, address, welcomeText, instagram, facebook} = await Organizations.findAll({
        where: {
            organizationId: req.params.id
        }
    })
    res.send({name, image, phone, address, welcomeText, instagram, facebook})
});

module.exports = router;