const { body, param, query, check } = require("express-validator");

const order = require("../models/orderSchema");

module.exports.addOrderValidation = [
  body("user")
    .notEmpty()
    .withMessage("user Id is required")
    .isNumeric()
    .withMessage("user Id must be a number"),
  body("city")
    .notEmpty()
    .withMessage("city is required")
    .isString()
    .withMessage("city must be string"),
  body("street")
    .notEmpty()
    .withMessage("street is required")
    .isString()
    .withMessage("street must be string"),
  body("buildingNumber")
    .notEmpty()
    .withMessage("buildingNumber is required")
    .isString()
    .withMessage("buildingNumber must be string"),
  body("floor")
    .notEmpty()
    .withMessage("floor is required")
    .isNumeric()
    .withMessage("floor must be a number"),
  body("apartment")
    .notEmpty()
    .withMessage("apartment is required")
    .isString()
    .withMessage("apartment must be string"),
  body("notes").optional().isString().withMessage("notes must be string"),
  body("products")
    .notEmpty()
    .withMessage("products is required")
    .isNumeric()
    .withMessage("products must be a number"),
  body("productInfo")
    .notEmpty()
    .withMessage("productInfo is required")
    .isArray()
    .withMessage("productInfo must be a an array"),
  check("productInfo.*.price")
    .notEmpty()
    .withMessage("product price is required")
    .isNumeric()
    .withMessage("totalPrice must be a number"),
  check("productInfo.*.productInfoId")
    .notEmpty()
    .withMessage("product productInfoId is required")
    .isNumeric()
    .withMessage("productInfoId must be a number"),
  check("productInfo.*.size")
    .notEmpty()
    .withMessage("product size is required")
    .isString()
    .withMessage("size must be a string"),
  body("orderStatus")
    .optional()
    .isIn(["pending", "rejected", "accepted", "on the way", "delivered"])
    .withMessage("order status must be enum"),
  body("delivery")
    .optional()
    .isNumeric()
    .withMessage("delivery  must be a number"),
];
module.exports.updateOrderById = [
  body("city").optional().isString().withMessage("city must be string"),
  body("street").optional().isString().withMessage("street must be string"),
  body("buildingNumber")
    .optional()
    .isString()
    .withMessage("buildingNumber must be string"),
  body("floor").optional().isNumeric().withMessage("floor must be a number"),
  body("apartment")
    .optional()
    .isString()
    .withMessage("apartment must be string"),
  body("notes").optional().isString().withMessage("notes must be string"),
  body("orderStatus")
    .optional()
    .isIn(["pending", "rejected", "accepted", "on the way", "delivered"])
    .withMessage("order status must be enum"),
  body("delivery")
    .optional()
    .isNumeric()
    .withMessage("delivery  must be a number"),
];
module.exports.deleteOrderValidation = [
  param("id")
    .notEmpty()
    .withMessage("order Id is required")
    .isLength({ min: 1, max: 10 })
    .withMessage("order Id must be between 1 and 10 characters long"),
];
