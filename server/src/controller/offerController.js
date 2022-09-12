const offerModel = require("../model/offerModel");
const fs = require("fs")

module.exports = {
    createOffer: async function (req, res) {
        console.log("Inside create offer function");

        try{
            var data = new offerModel(req.body);
            if(data){
                if(req.file){
                    data.offer_image = req.file.path;
                }
                data.youtube_link = req.body.youtube_link;
                await data.save();
                res.status(200).send('Offer added successfully')

            }else{
                res.status(400).send('Please provide input')
            }     
        }catch(err){
            res.status(400).send(err.toString())
        }
        
    },
    getOffer: async function (req, res) {
        console.log("Inside get offer function");
        try {
            const data = await offerModel.find();
            console.log(data)
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    },
    removeOffer: async function (req, res) {
        console.log("Inside remove offer function");
        try {
            const data = await offerModel.findOne({ _id:req.params.offerid });
            console.log(data)
            if (data) {
                await offerModel.deleteOne({ _id:req.params.offerid });
                var image = data.offer_image;
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);                
                fs.unlinkSync(image)
                res.status(200).send("Deleted successfully");
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}