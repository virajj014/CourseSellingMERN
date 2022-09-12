const invoiceModel = require("../model/invoiceModel");
const contactUsModel = require("../model/contactUsModel");
const affiliatePaymentModel = require("../model/affiliatePaymentModel");
const nodemailer = require('nodemailer');

module.exports = {

    leaderboard: async function (req, res) {
        console.log('Inside Leaderboard API')
        var result = [];
        try {
            data = await invoiceModel.aggregate(
                [
                    {
                        $group: {
                            _id: "$referred_by_email",
                            total_income: { $sum: { $multiply: ["$amount", 0.5] } },
                            username: { $first: "$referred_by_name" }
                        },
                    }
                ]
            )
            console.log(data);
            if (data) {
                data.map((e) => {
                    if (e._id != null) {
                        result.push(e);
                    }
                });

                res.send(result);

            } else {
                res.status(404).send('No Record Found');
            }
        } catch (err) {
            res.status(400).send(err.toString());
        }
    },
    createContactUs: async function (req, res) {
        console.log('Inside create contact us api')

        try {
            const data = await contactUsModel(req.body);

            if (data) {
                const contactData = await data.save();
                mailer(contactData.contactEmail, contactData.contactName, contactData.contactMessage)
                // res.status(200).send('Submitted')
                res.status(200).send('Submitted Successfully');
            } else {
                res.status(400).send('Please provide input')
            }

        } catch (err) {
            res.status(400).send(err.toString())
        }
    },
    getContactUs: async function (req, res) {
        console.log('Inside get contact us api');


        try {
            const data = await contactUsModel.find();
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send('No record Found');
            }
        } catch (err) {
            res.status(400).send(err.toString())
        }
    },
    createAffiliatePayment: async function (req, res) {
        console.log('Inside create affiliate payment api')
        console.log(req.body)
        try {
            const data = await affiliatePaymentModel(req.body);
            if (data) {
                if (req.file) {
                    data.payment_proof = req.file.path;
                }
                await data.save();
                res.status(200).send('Submitted Successfully');
            } else {
                res.status(400).send('Please provide input')

            }
        } catch (err) {
            res.status(400).send(err.toString())
        }
    },
    getAffiliatePayment: async function (req, res) {
        console.log('Inside get affiliate payment api')

        try {
            const paramkey = req.params.key;
            const paramvalue = req.params.value;
            if (paramkey && paramvalue) {
                const data = await affiliatePaymentModel.find({
                    [paramkey]: paramvalue,
                });
                if (data.length > 0) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('No record Found');
                }
            } else {
                const data = await affiliatePaymentModel.find();
                if (data.length > 0) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send('No record Found');
                }
            }

        } catch (err) {
            res.status(400).send(err.toString())

        }

    },
    

}

const mailer = (email, name, msg) => {
    console.log(email + ' ' + name + ' ' + msg);
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
        to: 'paras7086@hotmail.com',
        subject: 'SmartEducates.com || Contact Us || ' + email,
        html: ` <h4>Contacted person name: ${name}</h4>`
            + ` <h4>Contacted person email: ${email}</h4>`
            + ` <h4>Message: ${msg}</h4>`
    };

    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}