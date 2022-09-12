const adminModel = require("../model/adminModel");
const bcrypt = require("bcryptjs");

var login_attempt = 0;
module.exports = {
    createAdmin: async function (req, res) {
        console.log("Inside post function");

        try {
            const data = new adminModel(req.body);
            if (data) {
                const addadmin = await data.save();
                res.status(201).send(addadmin);
            } else {
                res.status(404).send("Please provide data");
            }

        } catch (err) {
            if (err.toString().includes("11000") && err.toString().includes("email")) {
                res.status(401).send("Email id already exist");
            } else if (err.toString().includes("11000") && err.toString().includes("username")) {
                res.status(401).send("Username already exist");
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    getAllAdmin: async function (req, res) {
        console.log("inside get function");
        try {
            const getadmin = await adminModel.find();
            if (getadmin.length > 0) {
                res.status(200).send(getadmin);
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    getAdmin: async function (req, res) {
        console.log("inside get data with multiple fields function");
        try {
            const getdata = await adminModel.find({
                [req.params.key]: req.params.value,
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
    updateAdmin: async function (req, res) {
        console.log("inside update function");
        try {

            const _id = req.params.id;
            const updateadminbyid = await adminModel.findById(_id);
            if (!updateadminbyid) {
                res.send("Record Not Found");
            } else {
                updateadminbyid.set({
                    ...req.body
                })
                await updateadminbyid.save();
                res.send(updateadminbyid);
            }
        } catch (err) {
            if (err.toString().includes("E11000 duplicate key error")) {
                res.status(400).send("Email ID already Exists");
            } else if (err.toString().includes("11000") && err.toString().includes("username")) {
                res.status(401).send("Username already exist");
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    deleteAdmin: async function (req, res) {
        console.log("inside delete function");
        try {
            const _id = req.params.id;
            const deleteadminbyid = await adminModel.findByIdAndDelete(_id);
            if (!deleteadminbyid) {
                res.status(404).send("Record not found");
            } else {
                res.status(200).send(deleteadminbyid);
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    loginAdmin: async function (req, res) {
        console.log("inside login function");

        try {
            const username = req.body.email;
            const password = req.body.pwd;
            const useremail = await adminModel.findOne({ $OR: [{ email: username }, { username: username }] });
            console.log(useremail)

            if (!useremail) {
                res.status(404).send("Admin not registered");

            } else {
                const isMatch = await bcrypt.compare(password, useremail.password);
                if (isMatch) {
                    if (useremail.active === true) {


                        const token = await useremail.generateAuthToken();
                        const usermailWithToken = Object.assign({ token: token.toString(), useremail })
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
}