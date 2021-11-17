//endpoint testimonials
const express = require('express');
const router = express.Router();
const db = require('../models/index')
const Testimonials = db.sequelize.models.testimonials;

router.post('/', (req, res) => {
    if (req.body.name && req.body.content) {
        Testimonials.create({
            name: req.body.name,
            content: req.body.content
        }).then(() => {
            res.send({message: 'Testimonial created'})
        }).catch(err => {
            res.send({message: err})
        })
    } else {
        res.send({message: 'Missing data'})
    }
});

module.exports = router;