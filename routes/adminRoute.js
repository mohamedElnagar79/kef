const express = require("express");
const router = express.Router();
const mwError = require("../MW/validationMW");
const adminController = require("../controllers/adminController");
const authMW = require("../MW/authMW");
const {
  addAdminValidation,
  updateAdminValidation,
} = require("../validations/adminValidation");

router
  .route("/admin")
  .get(adminController.getAdmin)
  .post(
    authMW,
    (req, res, next) => {
      if (req.role == "first") {
        // console.log("kitchen id", req.id);
        next();
      } else {
        let error = new Error("not authorized");
        error.status = 403;
        next(error);
      }
    },
    addAdminValidation,
    mwError,
    adminController.confirmPassword,
    adminController.addAdmin
  );

router
  .route("/admin/:id")
  .put(updateAdminValidation, mwError, adminController.updateAdminById)
  .delete(adminController.deleteAdminById);

router
  .route("/admin/change-password/:id")
  .put(
    adminController.confirmPassword,
    mwError,
    adminController.adminChangePassword
  );
module.exports = router;
