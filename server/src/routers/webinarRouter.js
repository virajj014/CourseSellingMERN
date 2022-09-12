const express = require("express");
const router = new express.Router();
const webinarController = require('../controller/webinarController')
const uploadwebinar = require('../middleware/upload_webinar')

router.post("/webinar",uploadwebinar.single('webinar_image'), webinarController.createwebinar);
router.get("/webinar", webinarController.getwebinar);
router.delete("/webinar/:webinarid", webinarController.removewebinar);

module.exports = router;