const express = require('express');
const router = express.Router();
const routeController = require("../common/routeController");
const testimonialsController = require('../models/Testimonials');
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");


router.put("/testimonials/:id",IsAuthenticated, IsAdmin, (req, res,)=> {
    routeController.handleRequest(req, res, testimonialsController.updateOperation);
  });

  module.exports = router;