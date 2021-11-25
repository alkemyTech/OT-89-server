const db = require("../models/index");
const { validationResult } = require("express-validator");
const { isEmpty } = require("lodash");


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
    const { name, imageUrl } = req.body;
    const memberId = req.params.id;

    const payload = {};
    if (name) payload.name = name;
    if (imageUrl) payload.imageUrl = imageUrl;

    if (isEmpty(payload)) {
      res
        .status(400)
        .json({
          message:
            "Either a name or imageUrl is required to perform an update!",
        });
      return;
    }

    const memberExist = await Member.findByPk(memberId);

    if (!memberExist) {
      console.log(memberExist);
      res.status(404).json({ message: "Member doesn't exist" });
      return;
    }

    const [updatedMember] = await Member.update(payload, {
      where: { id: memberId },
      validate: true,
    });

    if (updatedMember) {
      res.status(204).send();
    } else {
      throw new Error("Ups! Something went wrong");
    }
  } catch (err) {
    next(err);
  }
};
const DeleteMember = async (req, res, next) => {
  try {
    const memberId = req.params.id;
    Member.destroy({ where: { id: memberId } });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = { CreateMember, MembersList, UpdateMember, DeleteMember };
