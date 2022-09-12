const carouseldataModel = require("../model/carouselModel");
const fs = require('fs');



module.exports = {
    createcarouseldata: async function (req, res) {
        console.log("Inside create carouseldata function");

        try {
            var data = new carouseldataModel(req.body);
            if (data) {
                if (req.file) {
                    data.carouselcard_img = req.file.path;
                }
                data.carouselcard_name = req.body.carouselcard_name;
                data.youtube_link = req.body.youtube_link;
                await data.save();
                res.status(200).send('carouselposter added successfully')

            } else {
                res.status(400).send('Please provide input')
            }
        } catch (err) {
            res.status(400).send(err.toString())
        }
    },
    getcarouseldata: async function (req, res) {
        console.log("Inside get carouseldata function");
        try {
            const data = await carouseldataModel.find();
            console.log(data)
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send("No Record found");
            }
        }
        catch (err) {
            res.status(500).send(err.toString());
        }
    },
    removecarouseldata: async function (req, res) {
        console.log("Inside remove carouseldata function");
        try {
            const data = await carouseldataModel.findOne({ _id: req.params.carouseldataid })
            if (data) {
                await carouseldataModel.deleteOne({ _id: req.params.carouseldataid });

                var image = data.carouselcard_img;
                var tempfile = fs.openSync(image, 'r');
                fs.closeSync(tempfile);
                fs.unlinkSync(image)

                res.status(200).send('Removed Successfully');
            } else {
                res.status(404).send("No Record found");
            }
        }
        catch (err) {
            res.status(500).send(err.toString());
        }
    }
}