const express = require("express");
const {
  getAllNews,
  getNewsById,
  updateNews,
  createNews,
  deleteNews,
} = require("../controllers/NewsController");

const router = express.Router();

//@DESC Brings the whole list of news
//@ROUTE /news
router.route("/").get(getAllNews);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(getNewsById);

//POST
//@ROUTE /news
router.route("/").post(createNews);

//@METHOD PUT
//@ROUTE /news/:id
router.route("/:id").put(updateNews);

//DELETE
//@ROUTE /news/:id
router.route("/:id").delete(deleteNews);

module.exports = router;
