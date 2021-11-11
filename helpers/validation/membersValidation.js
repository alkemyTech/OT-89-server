const { body } = require("express-validator");

const nameValidation = body("name")
  .isString()
  .isLength({ min: 2 })
  .withMessage("Members name must be least 2 characters!")
  .trim()
  .escape();

module.exports = { nameValidation };