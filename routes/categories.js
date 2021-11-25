const express = require("express");
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.delete("/:id", IsAuthenticated, IsAdmin, deleteCategory);
router.post("/", IsAuthenticated, IsAdmin, createCategory);
router.get("/", IsAuthenticated, IsAdmin, getAllCategories);
router.put("/:id", IsAuthenticated, IsAdmin, updateCategory);

module.exports = router;
