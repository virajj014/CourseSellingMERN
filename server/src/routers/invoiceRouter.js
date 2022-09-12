// require('dotenv').config();
const express = require("express");
const router = new express.Router();
// const authenticate = require("../middleware/authenticate");
const invoiceController = require("../controller/invoiceController");

router.post("/invoice",invoiceController.createInvoice);
router.get("/invoice",invoiceController.getInvoice);
router.get("/invoice/:key/:value",invoiceController.getInvoice);



module.exports = router;