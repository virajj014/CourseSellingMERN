const mongoose = require("mongoose");

/*****create schema */
const contactUsSchema = new mongoose.Schema({
    contactName: {
        type: String,
        required: true,
    },
    contactEmail: {
        type: String,
        required: true,
    },
    contactMessage: {
        type: String,
        required: true,
    }

}, { timestamps: true })

const contactUsModel = mongoose.model("contactUsCollection", contactUsSchema);

module.exports = contactUsModel;