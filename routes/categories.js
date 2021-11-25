const express = require("express");
const {
  CategoriesList,
  createCategory,
  updateCategory,
} = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.route("/").get(IsAuthenticated, IsAdmin, CategoriesList);

router.route("/").post(IsAuthenticated, IsAdmin, createCategory);

router.put("/:id", IsAuthenticated, IsAdmin, updateCategory);

module.exports = router;
