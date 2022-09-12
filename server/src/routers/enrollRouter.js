const express = require("express");
const router = new express.Router();
const EnrollController = require("../controller/enrollController");
const upload = require("../middleware/upload");



router.post("/enroll",EnrollController.createuser);
router.get("/enroll/:key/:value",EnrollController.getuser);
router.get("/enroll",EnrollController.getalluser);
router.patch("/enroll/:id",upload.single('user_image'),EnrollController.updateuser);
router.delete("/enroll/:id",EnrollController.deleteuser);
router.post("/login", EnrollController.loginuser); 
router.post("/refreshToken", EnrollController.refreshtoken);
router.patch("/changePassword/:id", EnrollController.changePassword);
router.post("/buyCourse/:email/:courseid", EnrollController.buyCourse);





module.exports = router;