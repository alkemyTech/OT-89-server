const express = require("express");
const { NewsList, NewsById,News} = require("../controllers/NewsController");

const router = express.Router();

//@DESC Brings the whole list of news
//@ROUTE /news
router.route("/").get(NewsList);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(NewsById);

//POST
//@ROUTE /news
router.route("/news").post(News)


module.exports = router;
