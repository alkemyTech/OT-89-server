const express = require("express");
const {
  CreateMember,
  MembersList,
  UpdateMember,
} = require("../controllers/MembersController");

const router = express.Router();

//@DESC
//@ROUTE /members
//router.route("/").post(validation, CreateMember);

//@DESC
//@ROUTE /members
//router.route("/").get(validation, MembersList);

//@DESC
//@ROUTE /members/:id
//router.route("/").put(validation, UpdateMember);

module.exports = router;
