const { body } = require("express-validator");

export const nameValidation = body("name")
  .isString()
  .isLength({ min: 2 })
  .withMessage("Members name must be least 3 characters!")
  .trim()
  .escape();
