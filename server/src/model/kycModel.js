const mongoose = require("mongoose");
const validator = require("validator");

/***** create Schema */

const kycSchema = new mongoose.Schema({
    userid : {
        type: String,
        required: true,
        unique: true
    },
    verified : {
        type: String,
        required: true,
        default: "No",
        enum: ['Approved','No','Pending','Rejected']
    },
    uname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("Invalid Email")
            }
        }
    },
    mobileNumber: {
        type: String,
        required: true,
       
        validate(value){
            console.log(validator.isMobilePhone(value,['en-IN']));
            if(!validator.isMobilePhone(value,['en-IN'])){                
                throw new Error("Please Enter valid indian mobile number");                
            }
        }
    },
    pinCode: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    aadharName: {
        type: String,
        required: true
    },
    panNumber: {
        type: String,
        required: true
    },
    panName: {
        type: String,
        required: true
    },
    bankAccountNumber: {
        type: String,
        required: true
    },
    bankName: {
        type: String,
        required: true
    },
    accountHolderName: {
        type: String,
        required: true
    },
    ifscCode: {
        type: String,
        required: true
    },
    documents: [{
        pdf_path : {
            type: String,
        }
    }]
},{timestamps:true})

kycSchema.methods.uploadDocuments = async function(req,res){
    
    this.documents = this.documents.concat(req)

}

/*****create module */
const kycModel = new mongoose.model("kycCollection",kycSchema);

module.exports = kycModel; 