const express = require("express");
const router = express.Router();

const { postActivity } = require("../controllers/ActivitiesController");

// POST activities to the database validation information
router.route("/").post(postActivity);

module.exports = router;
