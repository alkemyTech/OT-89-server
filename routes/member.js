const express = require("express");
const {
  CreateMember,
  MembersList,
  UpdateMember,
} = require("../controllers/MembersController");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const { nameValidation } = require("../helpers/validation/membersValidation");

const router = express.Router();

//@DESC create a new member for the organization
//@ROUTE /members
router.route("/").post(IsAuthenticated, nameValidation, CreateMember);

//@DESC
//@ROUTE /members
//router.route("/").get(validation, MembersList);

//@DESC
//@ROUTE /members/:id
//router.route("/").put(validation, UpdateMember);

module.exports = router;
