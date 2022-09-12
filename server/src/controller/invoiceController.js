const invoiceModel = require("../model/invoiceModel");


module.exports = {
    createInvoice: async function (req, res) {
        console.log("Inside create Invoice API");
        console.log(req.body)
        try {
            const data = new invoiceModel(req.body);
            console.log(data)
            if (data) {
                const invoice = await data.save();
                res.status(200).send(invoice);
                console.log(invoice)
            } else {
                res.status(404).send("Please provide data");
            }
        } catch (err) {
            if (err.toString().includes("E11000 duplicate")) {
                res.status(401).send("invoice id already exist");
            } else {
                res.status(400).send(err.toString());
            }
        }
    },
    getInvoice: async function (req, res) {
        console.log("Inside create Invoice API");

        try {
            const paramkey = req.params.key;
            const paramvalue = req.params.value;

            if (paramkey && paramvalue) {
                const data = await invoiceModel.find({
                    [paramkey]: paramvalue,
                });
                if (data.length > 0) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send("No Record found");
                }
            } else {
                const data = await invoiceModel.find();
                if (data.length > 0) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send("No Record found");
                }
            }
        } catch (err) {
            res.status(400).send(err.toString());
        }
    }
}