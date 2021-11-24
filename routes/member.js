const express = require("express");
const {
  CreateMember,
  MembersList,
  UpdateMember,
  DeleteMember,
} = require("../controllers/MembersController");
const IsAuthenticated = require("../helpers/auth/isAuthenticated");
const IsAdmin = require("../helpers/auth/isAdmin");
const { nameValidation } = require("../helpers/validation/membersValidation");

const router = express.Router();

//@DESC create a new member for the organization
//@ROUTE /members
router.route("/").post(nameValidation, CreateMember);

//@DESC retrieve a list of all members of the organization
//@ROUTE /members
router.route("/").get(MembersList);

//@DESC update a member's information
//@ROUTE /members/:id
router.route("/:id").put(UpdateMember);

//@DESC delete a member from the organization
//@ROUTE /members/:id
router.route("/:id").delete(DeleteMember);

module.exports = router;
