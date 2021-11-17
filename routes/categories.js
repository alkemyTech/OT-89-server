//crear modulo category y exportarlo
const express = require('express');
const IsAdmin = require('../helpers/auth/isAdmin');
const IsAuthenticated = require('../helpers/auth/isAuthenticated');
const router = express.Router();
const db = require('../models/index');
const Categories = db.sequelize.models.categories;

router.delete('/:id',IsAuthenticated,IsAdmin, (req, res) => {
    Categories.destroy({
        where: {
            id: req.params.id
        }
    }).then(() => {
        res.send({
            message: 'categoria eliminada'
        });
    }).catch((err) => {
        res.send(err);
    });
});

module.exports = router;