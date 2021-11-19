const express = require('express');
const router = express.Router();
const {updateOperation} = require('../controllers/CategoryControllers');
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

router.put("/:id",IsAuthenticated, IsAdmin, updateOperation);



module.exports = router;