const enrollModel = require("../model/enrollModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require('fs');

module.exports = {
    createuser: async function (req, res) {
        console.log("Inside create user function");

        try {
            var data = new enrollModel(req.body);
            if (data) {
                if (req.body.cpwd === req.body.pwd) {

                    if (req.file) {
                        data.user_image = req.file.path
                    }

                    data.referralCode = await ref();
                    console.log(data)
                    const adddata = await data.save();

                    res.status(201).send(adddata);
                } else {
                    res.send("password and confirm password do not match");
                }

            } else {
                res.status(400).send("Error");
            }

        } catch (err) {
            if (err.toString().includes("11000") && err.toString().includes("email")) {
                res.status(400).send("Duplicate Email ID not allowed");
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    getalluser: async function (req, res,) {
        console.log("inside get function");
        try {
            const getenroll = await enrollModel.find();
            if (getenroll.length > 0) {
                res.status(200).send(getenroll);
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    getuser: async function (req, res) {
        console.log("inside get data with multiple fields function");
        try {
            const paramkey = req.params.key;
            const paramvalue = req.params.value;
            const getdata = await enrollModel.find({
                [paramkey]: paramvalue,
            });
            if (getdata.length > 0) {
                res.status(200).send(getdata);
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send("Invalid Input");
        }
    },
    updateuser: async function (req, res) {
        console.log("inside update function");
        const _id = req.params.id;
        const user = await enrollModel.findById(_id);
        try {


            if (!user) {
                res.send("Record Not Found");
            } else {
                if (req.file) {
                    var image = user.user_image;
                    console.log(image)
                    var tempfile = fs.openSync(image, 'r');
                    console.log("tempfile")
                    fs.closeSync(tempfile);
                    fs.unlinkSync(image)
                    req.body.user_image = req.file.path
                }
                user.set({
                    ...req.body
                });
                await user.save();
                res.status(200).send("Information Updated successfully");
            }
        } catch (err) {
            if (err.toString().includes("E11000 duplicate key error")) {
                res.status(401).send("Duplicate Email ID not allowed");
            } else if (err.toString().includes("CastError")) {
                res.status(500).send("Invalid ID");
            } else if (err.toString().includes("Error: ENOENT: no such file or directory")) {
                req.body.user_image = req.file.path
                user.set({
                    ...req.body
                });
                await user.save();
                res.status(200).send("Profile Updated successfully");

            } else {
                res.status(400).send(err.toString());
                console.log(err.toString());

            }
        }
    },
    deleteuser: async function (req, res) {
        console.log("inside delete function");
        try {
            const _id = req.params.id;
            const data = await enrollModel.findById(_id);
            if (!data) {

                res.status(404).send("Record not found");
            } else {

                await enrollModel.findByIdAndDelete(_id);
                var image = data.user_image;
                console.log(image)
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);
                fs.unlinkSync(image)
                res.status(200).send('User deleted successfully');
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    loginuser: async function (req, res) {
        console.log("inside login function");

        try {
            const email = req.body.email;
            const password = req.body.pwd;

            const useremail = await enrollModel.findOne({ email: email });

            if (!useremail) {
                res.status(404).send("User not registered");

            } else {

                const isMatch = await bcrypt.compare(password, useremail.pwd);
                console.log(isMatch);

                if (isMatch) {
                    if (useremail.active === true) {

                        const token = await useremail.generateAuthToken();
                        const refreshToken = await useremail.generateAuthRefreshToken();

                        const usermailWithToken = Object.assign({ token: token.toString(), refreshToken: refreshToken.toString(), useremail })
                        res.status(201).send(usermailWithToken);
                        useremail.set({
                            "login_attempt": 0
                        });
                        await useremail.save();
                    } else {
                        res.status(403).send("your account is restricted please contact support")
                    }
                } else {
                    if (useremail.active === true) {
                        if (useremail['login_attempt'] > 3) {
                            useremail.set({
                                "active": false,
                                "login_attempt": 0
                            });
                            await useremail.save();
                        } else {
                            useremail.set({
                                "login_attempt": useremail['login_attempt'] + 1
                            })
                            await useremail.save();
                            res.status(404).send("Password is incorrect try again" + `   failed attempt: ${useremail['login_attempt']}`);
                        }
                    } else {
                        res.status(403).send("your account is restricted please contact support")
                    }
                }
            }

        } catch (err) {
            res.status(404).send(err.toString());
        }
    },
    refreshtoken: async function (req, res) {
        const refreshToken = req.body.refreshToken;
        jwt.verify(refreshToken, process.env.SECRET_REFERESH_KEY, function (err, decode) {
            if (err) {
                err.status(400).send(err);
            } else {
                const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY, { expiresIn: '60s' });
                const refreshToken = req.body.refreshToken;
                res.status(200).json({
                    message: 'Token Refereshed Successfully ',
                    token,
                    refreshToken
                });
            }
        })
    },
    changePassword: async function (req, res) {
        console.log('inside change password function');

        try {
            const password = req.body.oldpwd;
            const newPassword = req.body.newpwd;
            const confirmPassword = req.body.cnfmpwd;
            const _id = req.params.id;
            const user = await enrollModel.findById(_id);

            const isMatch = await bcrypt.compare(password, user.pwd);

            if (isMatch) {
                if (newPassword === confirmPassword) {
                    user.pwd = newPassword;
                    const saveuser = await user.save();
                    res.status(200).send(saveuser);
                    res.status(400).send('Password changed successfully ')
                } else {
                    res.status(400).send('New password & confirm password does not match ✖')
                }

            } else {
                res.status(400).send('Old Password does not match ✖')
            }

        } catch (err) {
            res.status(400).send(err.toString());
        }
    },
    buyCourse: async function (req, res) {
        console.log("inside buy course function");

        try {
            const email = req.params.email;
            const course_id = req.params.courseid;
            const user = await enrollModel.findOne({ email: email });
            if (!user) {
                res.send("User Not Found");
            } else {
                user.purchased_course = user.purchased_course.concat({ course_id: course_id });
                await user.save();
                res.status(200).send("Course purchased successfully");
            }
        } catch (err) {

            res.status(400).send(err.toString());

        }
    }
};


const ref = async function () {

    const randomNumber = Math.random().toString(36).substring(2, 10 + 2).toUpperCase();
    const rf = await enrollModel.findOne({ referralCode: randomNumber }, { referralCode: 1, _id: 0 });

    if (!rf) {
        return randomNumber;
    } else {
        return Math.random().toString(36).substring(2, 10 + 2).toUpperCase();
    }

};
