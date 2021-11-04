const express = require("express");
const { NewsList, NewsById } = require("../controllers/NewsController");

const router = express.Router();

//@DESC Brings the whole list of news
//router.route("/").get(NewsList);

//@DESC single news by id
//router("/:id").get(middleware, NewsById);

module.exports = router;
