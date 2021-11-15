const express = require('express');
const router = express.Router();
const {updateOperation, deleteOperation } = require('../controllers/testimonialsControllers');
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");


router.put("/testimonials/:id",IsAuthenticated, IsAdmin, updateOperation);

router.delete("/testimonials/:id",IsAuthenticated, IsAdmin, deleteOperation);

  module.exports = router;