const express = require("express");
const router = express.Router();

const isAdmin = require("../helpers/auth/isAdmin");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");

const {
  postActivity,
  getActivity,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../controllers/ActivitiesController");
const { uploadImage, uploadMiddleware } = require("../controllers/ImageController");

// POST activities to the database validation information
router.route("/").post(IsAuthenticated, isAdmin,postActivity);
router.route("/").get(IsAuthenticated, isAdmin, getActivity);
router.route("/:id").get(IsAuthenticated, isAdmin, getActivityById);
router.route("/:id").put(IsAuthenticated, isAdmin, updateActivity);
router.route("/:id").delete(IsAuthenticated, isAdmin, deleteActivity);

module.exports = router;
