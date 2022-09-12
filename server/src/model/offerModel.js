const mongoose = require("mongoose");

/***** create Schema */

const offerSchema = new mongoose.Schema({
    offer_name: {
        type: String,
        require: true,
    },
    offer_image: {
        type: String,
        require: true,
    },
    youtube_link: {
        type: String,
    }

}, { timestamps: true })

/*****create module */
const offerModel = new mongoose.model("offerCollection", offerSchema);

module.exports = offerModel;
