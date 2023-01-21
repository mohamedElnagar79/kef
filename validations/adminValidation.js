const { body, param, query, check } = require("express-validator");
const mongoose = require("mongoose");
require("../models/adminSchema");
const Admin = mongoose.model("admin");
exports.addAdminValidation = [
  body("firstName")
    .notEmpty()
    .withMessage("first name is required")
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("email must be valid email")
    .isLength({ max: 40 })
    .withMessage("email must be max 40 long"),
  check("email").custom((value) => {
    return Admin.findOne({ email: value }).then((admin) => {
      if (admin) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isString()
    .withMessage("Password must be a string")
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password is too weak. Field must contain min. of 8 characters, 1 number , 1 lowercase and uppercase character and a symbol"
    ),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phoneNumber is required")
    .isNumeric()
    .withMessage("phoneNumber must be a number")
    .isLength({ min: 10, max: 10 })
    .withMessage("phoneNumber must be 10 characters long"),
  body("wallet").optional().isNumeric().withMessage("wallet must be a number"),
];
exports.updateAdminValidation = [
  body("firstName")
    .optional()
    .isString()
    .withMessage("First name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("lastName")
    .optional()
    .isString()
    .withMessage("Last name must be a string")
    .isLength({ max: 30, min: 2 }),
  body("email")
    .optional()
    .isEmail()
    .withMessage("email must be valid email")
    .isLength({ max: 40 })
    .withMessage("email must be max 40 long"),
  body("password")
    .optional()
    .isStrongPassword({
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
    .withMessage(
      "Password is too weak. Field must contain min. of 8 characters, 1 number , 1 lowercase and uppercase character and a symbol"
    ),
  body("phoneNumber")
    .optional()
    .isLength({ min: 10, max: 10 })
    .withMessage("phoneNumber must be 10 characters long"),
  body("wallet").optional().isNumeric().withMessage("wallet must be a number"),
];
