const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const orderController = require("../controllers/orderController");
// const authMW = require("../MW/authMW");
const {
  addOrderValidation,
  updateOrderById,
  deleteOrderValidation,
} = require("../validations/orderValidation");

router
  .route("/order")
  .get(orderController.getAllOrders)
  .post(addOrderValidation, mwError, orderController.addOrder);

router
  .route("/order/:id")
  .get(orderController.getOrderById)
  .put(updateOrderById, mwError, orderController.updateOrderById)
  .delete(deleteOrderValidation, mwError, orderController.deleteOrderById);

router.route("/userOrders/:id").get(orderController.getUserOrders);
module.exports = router;
