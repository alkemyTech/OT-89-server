const express = require("express");
const db = require("../models/index");
//news controller imports
//news/:id controller imports

const router = express.Router();
const Entry = db.sequelize.models.Entry;

//@DESC array of news
//@ROUTE /news
//@METHOD GET
router("/").get(middleware, controller);

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
router("/:id").get(middleware, controller);

module.exports = router;
