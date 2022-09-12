const express = require("express");
const router = new express.Router();
const offerController = require('../controller/offerController')
const uploadOffer = require('../middleware/upload_offer')

router.post("/offer",uploadOffer.single('offer_image'), offerController.createOffer);
router.get("/offer", offerController.getOffer);
router.delete("/offer/:offerid", offerController.removeOffer);




module.exports = router;