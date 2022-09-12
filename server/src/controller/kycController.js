const kycModel = require("../model/kycModel");

module.exports = {
    createkyc: async function (req, res) {
        console.log("Inside create KYC function");

        try {
            var data = new kycModel(req.body);
            if (data) {

                if (req.files) {
                    for (i = 0; i < req.files.length; i++) {
                        data.uploadDocuments({ pdf_path: req.files[i].path });
                    }
                }
                const addkyc = await data.save();
                res.status(201).send(addkyc);

            } else {
                res.status(400).send("Error");
            }

        } catch (err) {
            if (err.toString().includes('E11000 duplicate')) {
                res.status(400).send('You have already uploaded your KYC documents');

            }

        }
    },
    getkyc: async function (req, res) {
        console.log("Inside get KYC function");
        try {
            const userid = req.params.userid;
            if (userid) {
                const data = await kycModel.findOne({ userid });
                console.log(data)
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send("No Record found");
                }
            } else {
                const data = await kycModel.find();
                console.log(data)
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send("No Record found");
                }
            }

        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    kycAction: async function (req,res){
        console.log('Inside kycAction API')

        try{
            const userid = req.params.userid;
            if (userid) {
                const data = await kycModel.findOne({ userid });
                console.log(data)
                if (data) {
                    data.verified = req.params.status;
                    await data.save();
                    res.status(200).send(data);
                } else {
                    res.status(404).send("No Record found");
                }
            }else{
            res.status(400).send('Provide user ID')
            }

        }catch(err){
            res.status(400).send(err.toString())
        }
    }
}