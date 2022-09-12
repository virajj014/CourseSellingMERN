const mongoose = require("mongoose");
const validator = require("validator");

/*****create schema */
const courseSchema = new mongoose.Schema({

    course_name: {
        type: String,
        required: true,
        unique: [true, "Course name already present"],
    },
    course_author: {
        type: String,
        required: true,
    },
    course_description: {
        type: String,
        required: true,
    },
    course_image: {
        type: String,
    },
    course_price: {
        type: Number,
        required: true,
        default: 0,
    },
    offer_price: {
        type: Number,
        default: null,
    },
    cgst: {
        type: Number,
    },
    sgst: {
        type: Number,
    },
    course_video: [{
        video_path : {
            type: String,
        },
        video_title: {
            type: String,
        },
        video_description: {
            type: String,
        },
        video_type: {
            type: String,
            default: "Paid",
        },
        video_position: {
            type: Number,
        }
    }]
},{timestamps:true})

courseSchema.methods.uploadVideosData = async function(req,res){
    console.log(req)
    this.course_video = this.course_video.concat(req)
}

const courseModel = mongoose.model("courseCollection", courseSchema);

module.exports = courseModel;