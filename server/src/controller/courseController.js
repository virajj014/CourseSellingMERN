const e = require("express");
const courseModel = require("../model/courseModel");
const fs = require('fs');


module.exports = {
    createCourse: async function (req, res) {
        console.log("inside createCourse function.");


        try {
            const data = new courseModel(req.body);
            if (req.file) {
                data.course_image = req.file.path
            }
            const coursedata = await data.save();
            res.status(200).send("Added Course Successfully");
        } catch (err) {
            if (err.toString().includes('E11000 duplicate key error')) {
                res.status(400).send('Course with the same name is already present');
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    getCourse: async function (req, res) {
        console.log('Indside getCourse function');

        try {
            const paramkey = req.params.key;
            const paramvalue = req.params.value;

            if (paramkey && paramvalue) {
                const getdata = await courseModel.find({
                    [paramkey]: paramvalue,
                });
                if (getdata.length > 0) {
                    res.status(201).send(getdata);
                } else {
                    res.status(404).send('No data found');
                }
            } else {
                console.log('inside else');
                const getdata = await courseModel.find();
                if (getdata.length > 0) {
                    res.status(201).send(getdata);
                } else {
                    res.status(404).send('No data found');
                }
            }
        } catch {
            res.status(500).send(err.toString());
        }
    },
    updateCourse: async function (req, res) {
        console.log("inside updateCourse function");
        const _id = req.params.id;
        const updatecoursebyid = await courseModel.findById(_id);
        try {


            if (!updatecoursebyid) {
                res.status(404).send("Record Not Found");
            } else {

                if (req.file) {
                    console.log(updatecoursebyid)
                    var image = updatecoursebyid.course_image;
                    console.log(image);
                    var tempfile = fs.openSync(image, 'r');
                    fs.closeSync(tempfile);
                    fs.unlinkSync(image)
                    req.body.course_image = req.file.path

                }
                updatecoursebyid.set({
                    ...req.body
                });
                await updatecoursebyid.save();
                console.log(updatecoursebyid)

                res.status(200).send("Course details updates successfully");
            }
        } catch (err) {
            if (err.toString().includes("E11000 duplicate key error")) {
                res.status(400).send("Course with the same name is already present");
            } else if (err.toString().includes("Error: ENOENT: no such file or directory")) {
                req.body.course_image = req.file.path
                updatecoursebyid.set({
                    ...req.body
                });
                await updatecoursebyid.save();
                res.status(200).send("Updated successfully");

            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    deleteCourse: async function (req, res) {
        console.log("inside deleteCourse function");

        try {
            const _id = req.params.id;
            const data = await courseModel.findOne({ _id });
            if (!data) {
                res.status(404).send('No Record Found To Delete');
            } else {
                await courseModel.findByIdAndDelete(_id);

                var image = data.course_image;
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);
                fs.unlinkSync(image)
                for (var i = 0; i < data.course_video.length; i++) {
                    var vid = data.course_video[i].video_path;
                    var tempfile = fs.openSync(vid, 'r');
                    fs.closeSync(tempfile);
                    fs.unlinkSync(vid)
                }
                res.status(200).send("Course deleted successfully");
            }
        } catch (err) {
            if (err.toString().includes('CastError')) {
                res.status(404).send('No Record Found To Delete');
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    uploadCourseVideos: async function (req, res) {
        console.log("inside upload videos function");
        console.log(req.params)

        console.log(req.body)
        try {
            const _id = req.params.id;
            const updatecoursebyid = await courseModel.findById(_id);

            if (!updatecoursebyid) {
                res.status(404).send("Record Not Found");
            } else {


                if (req.file) {
                    updatecoursebyid.uploadVideosData({
                        video_path: req.file.path,
                        video_title: req.body.video_title,
                        video_description: req.body.video_description,
                        video_type: req.body.video_type,
                        video_position: req.body.video_position
                    });
                }
                updatecoursebyid.set({
                    ...req.body
                });
                await updatecoursebyid.save();
                res.status(200).send("Video uploaded successfully");
            }
        } catch (err) {

            res.status(400).send(err.toString());

        }
    },
    deleteCourseVideos: async function (req, res) {
        console.log("inside deleteCourse Videos function");

        try {
            const _id = req.params.id;
            const id = await courseModel.findOne({ _id: _id }, { course_video: 1 });
            let element = { _id: req.params.video_id }
            var isPresent = id.course_video.some(e => e._id == element._id);
            if (isPresent == false) {
                res.status(404).send('No Record Found To Delete');
            } else {

                for (var i = 0; i < id.course_video.length; i++) {
                    if (id.course_video[i]._id == req.params.video_id) {
                        var vid = id.course_video[i].video_path;
                        var tempfile = fs.openSync(vid, 'r');
                        fs.closeSync(tempfile);
                        fs.unlinkSync(vid)
                    }
                }
                id.course_video.remove({ _id: req.params.video_id });


                await id.save();

                res.status(200).send('Video successfully removed')
            }
        } catch (err) {

            res.status(400).send(err.toString());

        }
    },
    updateCourseVideos: async function (req, res) {
        console.log("inside update Course video function");
        const course_id = req.params.course_id;
        const video_id = req.params.video_id;


        const course = await courseModel.findById({ _id: course_id }, { course_video: 1 });
        const courseVideo = course.course_video;
        try {

            if (!courseVideo) {
                res.status(404).send("Record Not Found");
            } else {
                courseVideo.map((e) => {
                    if (e._id == video_id) {
                        if (req.file) {
                            for (var i = 0; i < course.course_video.length; i++) {
                                if (course.course_video[i]._id == req.params.video_id) {
                                    var vid = course.course_video[i].video_path;
                                    var tempfile = fs.openSync(vid, 'r');
                                    fs.closeSync(tempfile);
                                    fs.unlinkSync(vid)
                                }
                            }
                            e.video_path = req.file.path

                        }
                        e.video_title = req.body.video_title,
                            e.video_description = req.body.video_description,
                            e.video_type = req.body.video_type,
                            e.video_position = req.body.video_position
                    }
                })

                course.set({
                    ...req.body
                });
                await course.save();
                res.status(200).send("Video data updated successfully");
            }
        } catch (err) {

            if (err.toString().includes("Error: ENOENT: no such file or directory")) {
                courseVideo.map((e) => {
                    if (e._id == video_id) {
                        if (req.file) {

                            e.video_path = req.file.path

                        }
                        e.video_title = req.body.video_title,
                            e.video_description = req.body.video_description,
                            e.video_type = req.body.video_type,
                            e.video_position = req.body.video_position
                    }
                })

                course.set({
                    ...req.body
                });
                await course.save();
                res.status(200).send("Video data updated successfully");

            } else {
                res.status(400).send(err.toString());
            }

        }
    },
    getCourseVideos: async function (req, res) {
        console.log('Inside get course videos API');

        try {
            const course_id = req.params.course_id;
            const video_id = req.params.video_id;

            const course = await courseModel.findById({ _id: course_id }, { course_video: 1 });
            const courseVideo = course?.course_video;


            if (courseVideo.length == 0) {
                res.status(404).send("Record Not Found");
            } else {
                courseVideo?.map((e) => {

                    if (e._id == video_id) {
                        const data = e;
                        console.log(data)
                        res.status(200).send(data);
                    }
                    // data = e._id == video_id ? e : 'data not found';

                })
            }

        } catch (err) {
            res.status(400).send(err.toString())
        }
    }

}