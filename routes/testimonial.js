const express = require('express');
const router = express.Router();
const { updateOperation, deleteOperation, getOperation } = require('../controllers/testimonialsControllers');
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

router.get('/', getOperation);
router.put("/:id", IsAuthenticated, IsAdmin, updateOperation);
router.delete("/:id", IsAuthenticated, IsAdmin, deleteOperation);

module.exports = router;