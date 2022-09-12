const mongoose = require("mongoose");

const carouselDataSchema = new mongoose.Schema({
    carouselcard_name: {
        type: String,
        required: true
    },
    carouselcard_img: {
        type: String,
        required: true
    },
    youtube_link: {
        type: String,
    }
}, { timestamps: true });

const carouseldataModel = new mongoose.model("carouseldataCollection", carouselDataSchema);
module.exports = carouseldataModel;