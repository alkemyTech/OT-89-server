const express = require("express");
const {
  getAllCategories,
  createCategory,
  updateCategory,
} = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.route("/").get(IsAuthenticated, IsAdmin, getAllCategories);

router.route("/").post(IsAuthenticated, IsAdmin, createCategory);

router.route("/:id").patch(IsAuthenticated, IsAdmin, updateCategory);

router.route("/:id").delete(IsAuthenticated, IsAdmin, deleteCategory);

module.exports = router;
