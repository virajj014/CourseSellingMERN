const webinarModel = require("../model/webinarModel");
const fs = require("fs")

module.exports = {
    createwebinar: async function (req, res) {
        console.log("Inside create webinar function");

        try{
            var data = new webinarModel(req.body);
            if(data){
                if(req.file){
                    data.webinar_image = req.file.path;
                }
                data.meeting_link = req.body.meeting_link;
                await data.save();
                res.status(200).send('webinar added successfully')

            }else{
                res.status(400).send('Please provide input')
            }     
        }catch(err){
            res.status(400).send(err.toString())
        }
        
    },
    getwebinar: async function (req, res) {
        console.log("Inside get webinar function");
        try {
            const data = await webinarModel.find();
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
    removewebinar: async function (req, res) {
        console.log("Inside remove webinar function");
        try {
            const data = await webinarModel.findOne({ _id:req.params.webinarid });
            console.log(data)
            if (data) {
                await webinarModel.deleteOne({ _id:req.params.webinarid });
                var image = data.webinar_image;
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);
                fs.unlinkSync(image)
                res.status(200).send('Deleted Successfully');
            } else {
                res.status(404).send("No Record found");
            }
        } catch (err) {
            res.status(500).send(err.toString());
        }
    }
}