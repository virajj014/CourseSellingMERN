const express = require("express");
const router = new express.Router();
const carouseldataController = require("../controller/carouseldataController");
const upload_carouselposter = require("../middleware/upload_carouselposter");

router.post("/carouseldata", upload_carouselposter.single("carouselcard_img"), carouseldataController.createcarouseldata)
router.get("/carouseldata", carouseldataController.getcarouseldata)
router.delete("/carouseldata/:carouseldataid", carouseldataController.removecarouseldata)

module.exports = router;
