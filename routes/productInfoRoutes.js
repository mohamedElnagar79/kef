const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const authMW = require("../MW/authMW");
const productInfoController=require("../controllers/productInfoController");
const { addProductInfoValidation } = require("../validations/productInfoValidation");


router.route("/product-info")
.get(productInfoController.getAllProductInfo)
.post(productInfoController.addProductInfo)
.delete()

router.route("/product-info/:id")
.get(productInfoController.getProductInfoById)
.put(productInfoController.updateProductInfoById)
.delete(productInfoController.deleteProductInfoById)
router .route("/product-info-image/:id")
.delete(productInfoController.deleteImage)
module.exports = router;
