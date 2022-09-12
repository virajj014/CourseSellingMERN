const otpModel = require("../model/otpModel");
const enrollModel = require("../model/enrollModel");
const nodemailer = require('nodemailer');


module.exports = {

    emailSender: async function (req, res) {
        await otpModel.deleteMany({ email: req.body.email });
        const code = Math.floor((Math.random() * 10000) + 1);
        try {
            const data = await enrollModel.findOne({ email: req.body.email });
            console.log(data);
            if (data) {
                var addotp = new otpModel({
                    email: req.body.email,
                    code: code,
                    expiresIn: new Date().getTime() + 600000,
                })
                const otpdata = await addotp.save();
                mailer(data.email, otpdata.code);
                res.status(200).send(otpdata);
            } else {
                res.status(404).send('email not registered');
            }
        } catch (err) {
            res.status(400).send(err.toString());
        }
    },
    passwordChanger: async function (req, res) {
        console.log('Inside passwordChanger');

        try {
            const data = await otpModel.find({ $and: [{ email: req.body.email }, { code: req.body.code }] });
            console.log(data);
            if (data.length > 0) {
                var currentTime = new Date().getTime();
                console.log(currentTime);
                console.log(data[0].expiresIn);
                var diff = data[0].expiresIn - currentTime;
                console.log(diff);
                if (diff < 0) {
                    res.status(400).send('Time Out');
                } else {
                    const user = await enrollModel.findOne({ email: req.body.email });
                    user.pwd = req.body.pwd;
                    const saveuser = await user.save();
                    res.status(200).send(saveuser);
                }
            } else {
                res.status(400).send('Invalid OTP');
            }
        } catch (err) {
            res.status(400).send(err.toString())
        }
    },
}


const mailer = (email, otp) => {
    console.log(otp);
    var transporter = nodemailer.createTransport({
        service: 'hotmail',
        port: 587,
        secure: false,
        auth: {
            user: 'paras7086@hotmail.com',
            pass: 'P@r@s7086',
        }
    });

    var mailOptions = {
        from: 'paras7086@hotmail.com',
        to: email,
        subject: 'SmartEducates.com: ' + otp + ' is your verification code for secure registration',
        html: '<h4>Hi User</h4> <h4>Greetings!</h4> <h4>You are just a step away to chnage your password successfully.</h4>'
            + ' <h4>We are sharing verification code that is valid for 10 minutes. Please confiirm the same to continue the process.</h4>'
            + ` <h4>Your OTP: ${otp}</h4>`
            + ` <h4>Expires in: 10 Minutes</h4>`
            + ' <h4>Best Regards</h4>'
            + ' <h4>Team SmartEducates</h4>'
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}