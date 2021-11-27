const express = require("express");
const router = express.Router();

const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

const {
  getTestimonials,
  createTestimonials,
  updateTestimonials,
  deletedTestimonial,
} = require("../controllers/testimonialsControllers");

router.route("/").get(getTestimonials);
router.route("/").post(IsAuthenticated, IsAdmin, createTestimonials);
router.route("/:id").put(IsAuthenticated, IsAdmin, updateTestimonials);
router.route("/:id").delete(IsAuthenticated, IsAdmin, deletedTestimonial);

module.exports = router;
