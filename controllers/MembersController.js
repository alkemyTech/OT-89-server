const db = require("../models/index");
const { validationResult } = require("express-validator");

const Member = db.sequelize.models.Member;

//@DESC create a new member for the organization
//@ROUTE /members
//@METHOD POST
const CreateMember = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({
        error: errors.array(),
      });
      return;
    }

    const { name } = req.body;
    const newMember = await Member.create(
      { name: name },
      {
        validation: true,
        fields: ["name"],
      }
    );

    if (!newMember) {
      throw new Error("Member creation did not go as expected");
    }

    res.status(201).json({ message: "Ok!", data: newMember });
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
