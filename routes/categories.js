const express = require("express");
const { CategoriesList } = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.route("/").get(IsAuthenticated, IsAdmin, CategoriesList);

module.exports = router;
