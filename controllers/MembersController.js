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
    const { name, imageUrl } = req.body;
    const mermberId = req.params.id;

    const memberExist = await Member.findByPk(mermberId);
    if (!memberExist) {
      err.status(404).json({ message: "Member id doesn't exist" });
      return;
    }

    const payload = {};
    if (name) payload.name = name;
    if (imageUrl) payload.imageUrl = imageUrl;

    const updatedMember = await Member.update(payload, {
      //[rowsUpdate, [updatedMember]]
      where: { id: memberId },
      //returning: true,
      validate: true,
    });

    res.json(200).json({ message: "Ok!", data: updatedMember });
  } catch (err) {
    next(err);
  }
};

module.exports = { CreateMember, MembersList, UpdateMember };
