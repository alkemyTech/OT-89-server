const { body, validationResult } = require("express-validator");

const validateLogin = (email, password) => {
  body("email").isEmail(),
    // password must be at least 5 chars long
    body("password").isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    };
};
exports.module = validateLogin;
