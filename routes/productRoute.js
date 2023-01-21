const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const authMW = require("../MW/authMW");
const productController = require("../controllers/productController");
const {
  updateProductsValidation,
  addProductsValidation,
} = require("../validations/productsValidation");

router
  .route("/product")
  .get(productController.getAllProducts)
  .post(addProductsValidation, mwError, productController.addNewProduct)
  .delete();
router
  .route("/product/:id")
  .get(productController.getProductById)
  .put(updateProductsValidation, mwError, productController.updateProductById)
  .delete(productController.deleteProductById);

module.exports = router;
