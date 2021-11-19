const express = require("express");
<<<<<<< HEAD
const { NewsList, NewsById, NewsUpdate, NewsDelete } = require("../controllers/NewsController");

=======
const {
  NewsList,
  NewsById,
  News,
  NewsDelete,
} = require("../controllers/NewsController");
>>>>>>> main

const router = express.Router();

//@DESC Brings the whole list of news
//@ROUTE /news
router.route("/").get(NewsList);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(NewsById);

<<<<<<< HEAD
//@METHOD PUT
//@ROUTE /news/:id
router.route("/:id").put(NewsUpdate)
//DELETE
//@ROUTE /news/:id
router.route("/:id").delete(NewsDelete)
=======
//POST
//@ROUTE /news
router.route("/").post(News);

//DELETE
//@ROUTE /news/:id
router.route("/:id").delete(NewsDelete);
>>>>>>> main

module.exports = router;
