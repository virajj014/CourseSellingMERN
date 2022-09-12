const express = require("express");
const router = new express.Router();
const commonController = require("../controller/commonController");
const uploadPayment = require("../middleware/upload_paymentProof")

router.get("/leaderboard", commonController.leaderboard);
router.post("/contactus", commonController.createContactUs);
router.get("/contactus", commonController.getContactUs);
router.post("/payment", uploadPayment.single('payment_proof'), commonController.createAffiliatePayment);
router.get("/payment", commonController.getAffiliatePayment);
router.get("/payment/:key/:value", commonController.getAffiliatePayment);





module.exports = router; 