const mongoose = require("mongoose");


/*****create schema */
const invoiceSchema = new mongoose.Schema({
    user_id: {
        type: String,
        require: true,
    },
    referred_by: {
        type: String,
        default: null,
    },
    referred_by_email: {
        type: String,
        default: null,
        
    },
    referred_by_name: {
        type: String,
        default: null,
        
    },
    invoice_number: {
        type: Number,
        require: true,
        unique: true,
        
    },
    status: {
        type: String,
        require: true,
    },
    client_name: {
        type: String,
        require: true,        
    },
    client_address: {
        type: String,
        require: true,
    },
    client_contact_number: {
        type: String,
        require: true,
    },
    course_name: {
        type: String,
        require: true,
    },
    quantity: {
        type: Number,
        require: true,
    },
    amount: {
        type: Number,
        require: true,
    },
    cgst: {
        type: Number,
        require: true,
    },
    sgst: {
        type: Number,
        require: true,
    },
},{ timestamps: true }); 



/*****create module */
const invoiceModel = new mongoose.model("invoiceCollection", invoiceSchema);

module.exports = invoiceModel;