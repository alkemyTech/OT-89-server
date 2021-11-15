const express = require("express");
const { NewsList, NewsById, NewsUpdate, NewsDelete } = require("../controllers/NewsController");


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
//DELETE
//@ROUTE /news/:id
router.route("/news/:id").delete(NewsDelete)

module.exports = router;
