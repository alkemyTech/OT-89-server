const express = require("express");
// const IsAuthenticated = require('../helpers/auth/isAuthenticated');
// const IsAdmin = require('../helpers/auth/isAdmin');
const {createCategory} = require("../controllers/CategoriesController");

const router = express.Router();

router.route("/").post( createCategory);

module.exports = router;