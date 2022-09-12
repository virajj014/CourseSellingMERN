const mongoose = require("mongoose");

/***** create Schema */

const webinarSchema = new mongoose.Schema({
    webinar_name:{
        type:String,
        require:true,
    },
    webinar_image: {
        type: String,
        require: true,
    },
    meeting_link: {
        type: String,
        require: true,
    }
   
},{timestamps:true})

/*****create module */
const webinarModel = new mongoose.model("webinarCollection",webinarSchema);

module.exports = webinarModel;
