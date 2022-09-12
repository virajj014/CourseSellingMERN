const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    code: String,
    expiresIn: Number
},{timestamps:true})

const otpModel = new mongoose.model("otpCollection",otpSchema);

module.exports = otpModel;
