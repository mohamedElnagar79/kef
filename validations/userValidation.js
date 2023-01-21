const { body, param, query, check } = require("express-validator");
const mongoose = require("mongoose");
require("../models/userSchema");
const User = mongoose.model("users");

exports.addUserValidation = [
  body("firstName")
    .notEmpty()
    .withMessage(" user first name is required")
    .isString()
    .withMessage(" user first name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user first name must be less than 30 characters long and min 2"
    ),
  body("lastName")
    .notEmpty()
    .withMessage(" user last name is required")
    .isString()
    .withMessage(" user last name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage(
      "user last name must be less than 30 characters long and min 2"
    ),
  body("email")
    .notEmpty()
    .withMessage("user email is required")
    .isEmail()
    .withMessage("email must be valid email")
    .isLength({ max: 40 })
    .withMessage("email must be max 40 long"),
  check("email").custom((value) => {
    console.log("value", value);
    return User.findOne({ email: value }).then((user) => {
      if (user) {
        console.log("user", user);
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  body("phoneNumber")
    .notEmpty()
    .withMessage("phone number is required")
    .isNumeric()
    .withMessage("phone number must be valid numbers")
    .isLength({ min: 10, max: 10 })
    .withMessage("user phone must be 10 characters long")
    .isMobilePhone(),
  body("password")
    .notEmpty()
    .withMessage("password is required")
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
];
