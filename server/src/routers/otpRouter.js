const express = require("express");
const router = new express.Router();
const otpController = require('../controller/otpController')

router.post("/emailSend",otpController.emailSender);

router.post("/changePassword",otpController.passwordChanger);


module.exports = router;