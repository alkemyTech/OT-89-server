const express = require("express");
const {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getCategoryById
} = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.get("/", IsAuthenticated, IsAdmin, getAllCategories);
router.get("/:id", IsAuthenticated, IsAdmin, getCategoryById);
router.post("/", IsAuthenticated, IsAdmin, createCategory);
router.put("/:id", IsAuthenticated, IsAdmin, updateCategory);
router.delete("/:id", IsAuthenticated, IsAdmin, deleteCategory);

module.exports = router;
