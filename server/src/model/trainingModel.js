const mongoose = require("mongoose");

/***** create Schema */

const trainingSchema = new mongoose.Schema({
    traning_name:{
        type:String,
        require:true,
    },
    training_image: {
        type: String,
        require: true,
    },
    youtube_link: {
        type: String,
    }
   
},{timestamps:true})

/*****create module */
const trainingModel = new mongoose.model("trainingCollection",trainingSchema);

module.exports = trainingModel;
