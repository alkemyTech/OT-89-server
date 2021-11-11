const db = require("../models/index");
const { validationResult } = require("express-validator");
const { isEmpty } = require("lodash");

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

//@DESC retrieve a list of all members of the organization
//@ROUTE /members
//@METHOD GET
const MembersList = async (req, res, next) => {
  try {
    const membersList = await Member.findAll();

    if (!membersList) {
      throw new Error("Ups! Something went wrong");
    } else if (isEmpty(membersList)) {
      res.status(204).send();
    } else {
      res.status(200).json({ message: "Ok!", data: membersList });
    }
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
