const mongoose = require("mongoose");
require("../models/userSchema");
const User = mongoose.model("users");
const bcrypt = require("bcrypt");

// confirm password for user
(module.exports.confirmPassword = (req, res, next) => {
  if (
    (req.body.password || req.body.newPassword) !== req.body.confirmPassword
  ) {
    let error = new Error("Passwords do not match.");
    error.status = 400;
    return next(error);
  } else {
    next();
  }
}),
  // find all users
  (module.exports.getAllUsers = (req, res, next) => {
    User.find({})
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((error) => {
        next(error);
      });
  });

// find user by ID
module.exports.getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      if (data) {
        res.status(200).json(data);
      } else {
        throw new Error("User Not Found!");
      }
    })
    .catch((error) => {
      next(error);
    });
};

//add user
module.exports.createNewUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hashpass) => {
    let UserObj = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      password: hashpass,
    });
    UserObj.save()
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  });
};
// change password
module.exports.userChangePassword = (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((data) => {
      if (data) {
        bcrypt.compare(req.body.oldPassword, data.password).then((isEqual) => {
          if (!isEqual) {
            res.status(401).json({ data: "wrong password" });
          } else {
            bcrypt.hash(req.body.newPassword, 10).then((hashpass) => {
              data.password = hashpass;
              return data.save().then(res.status(200).json({ data }));
            });
          }
        });
      } else {
        res.status(401).json({ data: "user not found" });
      }
    })
    .catch((error) => {
      next(error);
    });
};

//update user by ID
module.exports.updateUserById = (req, res, next) => {
  User.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  )
    .then((data) => {
      if (data.modifiedCount == 0)
        next(new Error("nothing to update in user or user not found"));
      else if (req.body.password) {
        next(new Error("invalid key for update"));
      } else res.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

//delete user account by ID
module.exports.deleteUserById = (req, res, next) => {
  User.deleteOne({ _id: req.params.id })
    .then((data) => {
      if (data.deletedCount === 0) next(new Error("user not found"));
      else res.status(200).json({ data: "deleted" });
    })
    .catch((error) => {
      next(error);
    });
};
