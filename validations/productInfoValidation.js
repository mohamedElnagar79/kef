const { body, param, query, check } = require("express-validator");

const productInfo = require("../models/productInfoSchema");

exports.addProductInfoValidation = [
  body("productId")
    .notEmpty()
    .withMessage("product Id is required")
    .isNumeric()
    .withMessage("product Id must be a number"),
  body("colors").notEmpty().withMessage("color is required"),
  body("medium")
    .optional()
    .isNumeric()
    .withMessage(" medium size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("medium size must be less than 5 numbers long and min 1"),
  body("large")
    .optional()
    .isNumeric()
    .withMessage(" large size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("large size must be less than 5 numbers long and min 1"),
  body("xlarge")
    .optional()
    .isNumeric()
    .withMessage(" xlarge size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("xlarge size must be less than 5 numbers long and min 1"),
  //  body("images")
  //  .isArray()
];
exports.updateProductInfoValidation = [
  body("productId")
    .optional()
    .isNumeric()
    .withMessage("product Id must be a number"),
  body("colors").optional(),
  body("medium")
    .optional()
    .isNumeric()
    .withMessage(" medium size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("medium size must be less than 5 numbers long and min 1"),
  body("large")
    .optional()
    .isNumeric()
    .withMessage(" large size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("large size must be less than 5 numbers long and min 1"),
  body("xlarge")
    .optional()
    .isNumeric()
    .withMessage(" xlarge size must be a number")
    .isLength({ max: 5, min: 1 })
    .withMessage("xlarge size must be less than 5 numbers long and min 1"),
];
