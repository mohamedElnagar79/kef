const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { addUserValidation } = require("../validations/userValidation");
const errorMW = require("../MW/validationMW");
const authMW = require("../MW/authMW");
router
  .route("/user/signup")
  .post(
    addUserValidation,
    userController.confirmPassword,
    errorMW,
    userController.createNewUser
  );
router.route("/users").get(
  // authMW,
  // (req, res, next) => {
  //   if (req.role === "admin" || req.role === "first") {
  //     // console.log("kitchen id", req.id);
  //     next();
  //   } else {
  //     let error = new Error("not authorized");
  //     error.status = 403;
  //     next(error);
  //   }
  // },
  userController.getAllUsers
);
router
  .route("/user/:id")
  .get(userController.getUserById)
  .put(userController.updateUserById)
  .delete(userController.deleteUserById);

router
  .route("/user/change-password/:id")
  .put(
    userController.confirmPassword,
    errorMW,
    userController.userChangePassword
  );
module.exports = router;
