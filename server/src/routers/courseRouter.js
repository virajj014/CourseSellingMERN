const express = require("express");
const router = new express.Router();
const courseController = require("../controller/courseController");
const upload = require("../middleware/upload");
const uploadVideos = require("../middleware/upload_videos");


router.post("/course", upload.single('course_image'), courseController.createCourse);
router.get("/course/", courseController.getCourse);
router.get("/course/:key/:value", courseController.getCourse);
router.patch("/course/:id",upload.single('course_image'), courseController.updateCourse);
router.delete("/course/:id", courseController.deleteCourse); 
router.post("/videos/:id",uploadVideos.single('course_video'), courseController.uploadCourseVideos);
router.delete("/videos/:id/:video_id", courseController.deleteCourseVideos);
router.patch("/videos/:course_id/:video_id",uploadVideos.single('course_video'), courseController.updateCourseVideos);
router.get("/videos/:course_id/:video_id", courseController.getCourseVideos);




module.exports = router;