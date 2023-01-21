const mongoose = require("mongoose");
require("../models/adminSchema");
const Admin = mongoose.model("admin");
const bcrypt = require("bcrypt");
// confirm password for user
module.exports.confirmPassword=(req, res, next) => {
  if ((req.body.password||req.body.newPassword) !== req.body.confirmPassword) {
      let error = new Error('Passwords do not match.');
      error.status = 400;
      return next(error);
  }else{next()}
},
//find admin
module.exports.getAdmin = (req, res, next) => {
  Admin.find({})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((error) => {
      next(error);
    });
};
// add admin
module.exports.addAdmin = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashpass) => {
    let adminObj = new Admin({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashpass,
      phoneNumber: req.body.phoneNumber,
      nationalId: req.body.nationalId,
    });
    adminObj
      .save()
      .then((data) => {
        console.log(data);
        res.status(201).json({ data: data });
      })
      .catch((error) => {
        next(error);
      });
  });
};

//update admin
module.exports.updateAdminById = (req, res, next) => {
  Admin.updateOne(
    { _id: req.params.id },
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      nationalId: req.body.nationalId,
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0) next(new Error("nothing to update in admin"));
      else if(data.acknowledged===false){next(new Error("invalid key for admin"));}
      else res.status(200).json({ data,msg:"updated" });
    })
    .catch((error) => {
      next(error);
    });
};

// change password
module.exports.adminChangePassword = (req, res, next) => {
  Admin.findOne({ _id: req.params.id }).then((data) => {
    if (data) {
      bcrypt.compare(req.body.oldPassword, data.password).then((isEqual) => {
        if (!isEqual) {
          res.status(401).json({ data: "wrong password" });
        } else {
          bcrypt.hash(req.body.newPassword, 10).then((hashpass) => {
            data.password=hashpass
            return data.save().then(res.status(200).json({ data }));
          });
        }
      });
    } else {
      res.status(401).json({ data: "admin not found" });
    }
  });
};

//delete admin account by ID
module.exports.deleteAdminById=(req,res,next)=>{
  Admin.deleteOne({_id:req.params.id}).then((data)=>{
    if (data.deletedCount === 0) next(new Error("admin not found"));
    else res.status(200).json({ data: "deleted" });
  }).catch((error)=>{next(error)})
}