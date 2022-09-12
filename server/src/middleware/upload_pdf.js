const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'uploads/kyc')
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})
var upload = multer({
    storage: storage,

    // fileFilter: function(req,file,callback){

    //     if(file.mimetype == 'pdf/pdf'){
    //         callback(null,true)
    //     }else{
    //         console.log('only pdf file supported');
    //         const err = 'only pdf file supported'; 
    //         callback(err, false);
    //     }},
})
module.exports = upload;