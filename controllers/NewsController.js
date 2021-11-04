const db = require("../models/index");

const Entry = db.sequelize.models.Entry;

//@DESC Brings the whole list of news
//@ROUTE /news
//@METHOD GET
const NewsList = async (req, res, next) => {};

//@DESC single news by id
//@ROUTE /news/:id
//@METHOD GET
const NewsById = async (req, res, next) => {};

module.exports = { NewsList, NewsById };
