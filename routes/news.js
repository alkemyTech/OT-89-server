const express = require("express");
const { NewsList, NewsById, NewsUpdate } = require("../controllers/NewsController");

const router = express.Router();

//@DESC Brings the whole list of news
//@ROUTE /news
router.route("/").get(NewsList);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(NewsById);

//@METHOD PUT
//@ROUTE /news/:id
router.route("/news/:id").put(NewsUpdate)

module.exports = router;
