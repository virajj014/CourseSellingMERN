const trainingModel = require("../model/trainingModel");
const fs = require("fs");

module.exports = {
    createtraining: async function (req, res) {
        console.log("Inside create training function");

        try{
            var data = new trainingModel(req.body);
            if(data){
                if(req.file){
                    data.training_image = req.file.path;
                }
                data.youtube_link = req.body.youtube_link;
                await data.save();
                res.status(200).send('training added successfully')

            }else{
                res.status(400).send('Please provide input')
            }     
        }catch(err){
            res.status(400).send(err.toString())
        }
        
    },
    gettraining: async function (req, res) {
        console.log("Inside get training function");
        try {
            const data = await trainingModel.find();
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
    removetraining: async function (req, res) {
        console.log("Inside remove training function");
        try {
            const data = await trainingModel.findOne({ _id:req.params.trainingid });
            console.log(data)
            if (data) {
                await trainingModel.deleteOne({ _id:req.params.trainingid });
                var image = data.training_image;
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);
                fs.unlinkSync(image)
                res.status(200).send("Deleted Successfully");
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}