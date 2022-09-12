const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'uploads/training')
    },
    filename : function(req,file,cb){
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
})

const upload = multer({
    storage: storage,
    
    fileFilter: function(req,file,callback){
        
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg'){
            callback(null,true)
        }else{
            console.log('only jpeg and png file supported');
            const err = 'only jpeg and png file supported';
            callback(err, false);
        }
    },
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

module.exports = upload;