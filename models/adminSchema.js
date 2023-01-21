const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const adminSchema = new mongoose.Schema({
  _id: { type: Number },
  firstName: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    trim: true,
  },
  email: {
    type: String,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique: true,
    required: true,
    maxlength: 40,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
    length: 10,
    trim: true,
  },
  wallet: {
    type: Number,
  },
  role: {
    type: String,
    default: "admin",
  },
});
adminSchema.plugin(AutoIncrement, { id: "adminCounter" });

module.exports = mongoose.model("admin", adminSchema);
