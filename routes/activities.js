const express = require("express");
const router = express.Router();

const isAdmin = require("../helpers/auth/IsAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const { postActivity } = require("../controllers/ActivitiesController");
const { updateActivity } = require("../controllers/ActivitiesController");

// POST activities to the database validation information
router.route("/").post(IsAuthenticated, isAdmin, postActivity);
router.route("/:id").put(IsAuthenticated, isAdmin, updateActivity);

module.exports = router;
