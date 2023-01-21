const mongoose = require("mongoose")
const AutoIncrement = require('mongoose-sequence')(mongoose);

const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
})

loginSchema.plugin(AutoIncrement, { id: "loginCounter" });
module.exports = mongoose.model("login", loginSchema)

