const mongoose = require("mongoose");


/*****create schema */
const affiliatePaymentSchema = new mongoose.Schema({

    user_id: {
        type: String,
        required: true,
    },
    user_email: {
        type: String,
        required: true,
    },
    referralCode: {
        type: String,
        required: true,
    },
    amount_paid: {
        type: Number,
        required: true,
    },
    payment_proof: {
        type: String,
        required: true,
    },
    payment_date: {
        type: String,
        required: true,
    }
},{timestamps:true})

const affiliatePaymentModel = new mongoose.model("affiliatePaymentCollection", affiliatePaymentSchema);
module.exports = affiliatePaymentModel;