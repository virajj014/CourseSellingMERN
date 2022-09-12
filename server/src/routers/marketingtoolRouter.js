const express = require("express");
const router = new express.Router();
const marketingtoolController = require('../controller/marketingtoolController')
const uploadmarketingtool = require('../middleware/upload_marketingtool')

router.post("/marketingtool",uploadmarketingtool.single('marketingtool_image'), marketingtoolController.createmarketingtool);
router.get("/marketingtool", marketingtoolController.getmarketingtool);
router.delete("/marketingtool/:marketingtoolid", marketingtoolController.removemarketingtool);


module.exports = router;