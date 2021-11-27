const express = require("express");

const isAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

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
router.route("/").get(IsAuthenticated, isAdmin, getAllNews);

//@DESC single news by id
//@ROUTE /news/:id
router.route("/:id").get(IsAuthenticated, isAdmin, getNewsById);

//POST
//@ROUTE /news
router.route("/").post(IsAuthenticated, isAdmin, createNews);

//@METHOD PUT
//@ROUTE /news/:id
router.route("/:id").put(IsAuthenticated, isAdmin, updateNews);

//DELETE
//@ROUTE /news/:id
router.route("/:id").delete(IsAuthenticated, isAdmin, deleteNews);

module.exports = router;
