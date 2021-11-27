const express = require("express");
const router = express.Router();

const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

const {
  getTestimonials,
  createTestimonials,
  updateOperation,
  deleteOperation,
} = require("../controllers/testimonialsControllers");

router.route("/").get(getTestimonials);
router.route("/").post(createTestimonials);
router.route("/:id").put(IsAuthenticated, IsAdmin, updateOperation);
router.route("/:id").delete(IsAuthenticated, IsAdmin, deleteOperation);

module.exports = router;
