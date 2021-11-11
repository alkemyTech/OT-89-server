const express = require("express");
const { NewsList, NewsById,NewsDelete } = require("../controllers/NewsController");

const router = express.Router();

//@DESC Brings the whole list of news
//@ROUTE /news
router.route("/").get(NewsList);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(NewsById);

//DELETE
//@ROUTE /news/:id
router.route("/news/:id").delete(NewsDelete)

module.exports = router;
