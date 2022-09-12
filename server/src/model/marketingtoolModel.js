const mongoose = require("mongoose");

/***** create Schema */

const marketingtoolSchema = new mongoose.Schema({
    marketingtool_name: {
        type: String,
        require: true,
    },
    marketingtool_image: {
        type: String,
        require: true,
    },
    youtube_link: {
        type: String,
    }
   
},{timestamps:true})

/*****create module */
const marketingtoolModel = new mongoose.model("marketingtoolCollection",marketingtoolSchema);

module.exports = marketingtoolModel;
