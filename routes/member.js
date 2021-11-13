const express = require("express");
const {
  CreateMember,
  MembersList,
  UpdateMember,
} = require("../controllers/MembersController");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");
const { nameValidation } = require("../helpers/validation/membersValidation");


const router = express.Router();

//@DESC create a new member for the organization
//@ROUTE /members
router.route("/").post(IsAuthenticated, nameValidation, CreateMember);


//@DESC retrieve a list of all members of the organization
//@ROUTE /members
router.route("/").get(IsAuthenticated, IsAdmin, MembersList);


//@DESC
//@ROUTE /members/:id
//router.route("/").put(validation, UpdateMember);

module.exports = router;
