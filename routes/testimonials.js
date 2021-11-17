//endpoint testimonials
const express = require('express');
const IsAdmin = require('../helpers/auth/isAdmin');
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const router = express.Router();
const db = require('../models/index')
const Testimonials = db.sequelize.models.testimonials;

router.post('/', IsAuthenticated, IsAdmin, (req, res) => {
    if (req.body.name && req.body.content) {
        Testimonials.create({
            name: req.body.name,
            content: req.body.content
        }).then(() => {
            res.send({ message: 'Testimonial created' })
        }).catch(err => {
            res.send({ message: err })
        })
    } else {
        res.send({ message: 'Missing data' })
    }
});

module.exports = router;