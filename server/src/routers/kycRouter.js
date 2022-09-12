const express = require("express");
const router = new express.Router();
const kycController = require('../controller/kycController')
const uploadPDF = require('../middleware/upload_pdf')

router.post("/kyc",uploadPDF.array('documents'), kycController.createkyc);
router.get("/kyc/:userid", kycController.getkyc);
router.get("/kyc", kycController.getkyc);
router.patch("/kyc/:userid/:status", kycController.kycAction);

module.exports = router;