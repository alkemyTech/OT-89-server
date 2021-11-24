const express = require("express");
const {
  CategoriesList,
  createCategory,
} = require("../controllers/CategoriesController");
const IsAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

//const {updateOperation} = require('../controllers/CategoryControllers'); //FIXME: preguntar a Michel xq esta faltando el updateOperation
const { update } = require("../services/categoryService"); // Michel habia subido este servicio, puede ser el posible reemplazo

const router = express.Router();

//@DESC Brings the whole list of category names
//@ROUTE /categories
router.route("/").get(IsAuthenticated, IsAdmin, CategoriesList);

router.route("/").post(IsAuthenticated, IsAdmin, createCategory);

//router.put("/:id", IsAuthenticated, IsAdmin, updateOperation); //FIXME: preguntar a Michel xq esta faltando el updateOperation
router.put("/:id", IsAuthenticated, IsAdmin, update); // Michel habia subido este servicio, puede ser el posible reemplazo

module.exports = router;
