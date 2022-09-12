const marketingtoolModel = require("../model/marketingtoolModel");
const fs =require("fs")

module.exports = {
    createmarketingtool: async function (req, res) {
        console.log("Inside create marketingtool function");

        try{
            var data = new marketingtoolModel(req.body);
            if(data){
                if(req.file){
                data.marketingtool_image = req.file.path;
                }
                data.youtube_link = req.body.youtube_link;
                await data.save();
                res.status(200).send('marketingtool added successfully')

            }else{
                res.status(400).send('Please provide input')
            }     
        }catch(err){
            res.status(400).send(err.toString())
        }
        
    },
    getmarketingtool: async function (req, res) {
        console.log("Inside get marketingtool function");
        try {
            const data = await marketingtoolModel.find();
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
    removemarketingtool: async function (req, res) {
        console.log("Inside remove marketingtool function");
        try {
            const data = await marketingtoolModel.findOne({ _id:req.params.marketingtoolid });
            if (data) {
                await marketingtoolModel.deleteOne({ _id:req.params.marketingtoolid });
                var image = data.marketingtool_image;
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