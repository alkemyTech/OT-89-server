const express = require("express");
const router = express.Router();

const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");

const {
  updateOperation,
  deleteOperation,
  getOperation,
  createOperation,
} = require("../controllers/testimonialsControllers");

router.route("/").get(getOperation);
router.route("/").post(createOperation);
router.route("/:id").put(IsAuthenticated, IsAdmin, updateOperation);
router.route("/:id").delete(IsAuthenticated, IsAdmin, deleteOperation);

module.exports = router;
