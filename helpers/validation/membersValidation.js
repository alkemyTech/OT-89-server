const { body } = require("express-validator");

export const nameValidation = body("name")
  .isLength({ min: 3 })
  .withMessage("Members name must be least 3 characters!")
  .trim()
  .escape();
