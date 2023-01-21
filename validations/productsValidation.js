const { body, param, query, check } = require("express-validator");

const products = require("../models/productsSchema");

exports.addProductsValidation = [
  body("name")
    .notEmpty()
    .withMessage(" product name is required")
    .isString()
    .withMessage(" product name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage("product name must be less than 30 characters long and min 2"),
  check("name").custom((value) => {
    console.log("value", value);
    return products.findOne({ name: value }).then((products) => {
      if (products) {
        console.log("products", products);
        return Promise.reject("Duplicated Name");
      }
    });
  }),
  body("productInfoId")
    .optional()
    .isArray(Number)
    .withMessage("product info id must be array of numbers"),
  body("category")
    .optional()
    .isIn([
      "Hoodies",
      "T-shirts",
      "Pants",
      "Chemise",
      "Tote bags",
      "Jackets",
      "Other",
    ])
    .withMessage("you can only choose known category")
    .isString()
    .withMessage("category must be string"),
  body("gender")
    .optional()
    .isIn(["women", "unisex"])
    .withMessage("gender can only be wommen or unisex")
    .isString()
    .withMessage("gender must be string"),
  body("sale")
    .optional()
    .isBoolean()
    .withMessage("sale must be true or false only"),
  body("salePrice")
    .optional()
    .isNumeric()
    .withMessage("sale price must be number")
    .isLength({ max: 5, min: 2 })
    .withMessage("sale price must be less than 5 numbers long and min 2"),
  body("price")
    .notEmpty()
    .withMessage("price is required")
    .isNumeric()
    .withMessage("price must be number")
    .isLength({ max: 5, min: 2 })
    .withMessage("price must be less than 5 numbers long and min 2"),
  body("newCollection")
    .optional()
    .isBoolean()
    .withMessage("new collection must be true or false only"),
];

exports.updateProductsValidation = [
  body("name")
    .optional()
    .isString()
    .withMessage(" product name must be string")
    .isLength({ max: 30, min: 2 })
    .withMessage("product name must be less than 30 characters long and min 2"),
  body("productInfoId")
    .optional()
    .isNumeric()
    .withMessage("product info id must one number"),
  body("category")
    .optional()
    .isIn([
      "Hoodies",
      "T-shirts",
      "Pants",
      "Chemise",
      "Tote bags",
      "Jackets",
      "Other",
    ])
    .withMessage("you can only choose known category")
    .isString()
    .withMessage("category must be string"),
  body("gender")
    .optional()
    .isIn(["women", "unisex"])
    .withMessage("gender can only be wommen or unisex")
    .isString()
    .withMessage("gender must be string"),
  body("sale")
    .optional()
    .isBoolean()
    .withMessage("sale must be true or false only"),
  body("salePrice")
    .optional()
    .isNumeric()
    .withMessage("sale price must be number")
    .isLength({ max: 5, min: 2 })
    .withMessage("sale price must be less than 5 numbers long and min 2"),
  body("price")
    .optional()
    .isNumeric()
    .withMessage("price must be number")
    .isLength({ max: 5, min: 2 })
    .withMessage("price must be less than 5 numbers long and min 2"),
  body("newCollection")
    .optional()
    .isBoolean()
    .withMessage("new collection must be true or false only"),
];
