const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'uploads/videos')
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})
    
var upload = multer({
    storage: storage,
    
    fileFilter: function(req,file,callback){
        
        if(file.mimetype == 'video/mp4' || file.mimetype == 'video/mkv'){
            callback(null,true)
        }else{
            console.log('only mp4 and mkv file supported');
            const err = 'only mp4 and mkv file supported';
            callback(err, false);
        }
         
    },
    
})


module.exports = upload;