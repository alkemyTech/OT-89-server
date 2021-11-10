const db = require("../models/index");
const { validationResult } = require("express-validator");

const Member = db.sequelize.models.Member;

//@DESC create a new member
//@ROUTE /members
//@METHOD POST
const CreateMember = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

//@DESC retrieve a list of all members
//@ROUTE /members
//@METHOD GET
const MembersList = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

//@DESC update a member's information
//@ROUTE /members/:id
//@METHOD PUT
const UpdateMember = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};

module.exports = { CreateMember, MembersList, UpdateMember };
