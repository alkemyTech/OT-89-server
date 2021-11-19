const express = require("express");
const router = express.Router();

const isAdmin = require("../helpers/auth/IsAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const {
  postActivity,
  getActivity,
  getActivityById,
  updateActivity,
} = require("../controllers/ActivitiesController");

// POST activities to the database validation information
router.route("/").post(IsAuthenticated, isAdmin, postActivity);
router.route("/").get(IsAuthenticated, isAdmin, getActivity);
router.route("/:id").get(IsAuthenticated, isAdmin, getActivityById);
router.route("/:id").put(updateActivity);

module.exports = router;
