const express = require("express");
const router = new express.Router();
const trainingController = require('../controller/trainingController')
const uploadtraining = require('../middleware/upload_training')

router.post("/training",uploadtraining.single('training_image'), trainingController.createtraining);
router.get("/training", trainingController.gettraining);
router.delete("/training/:trainingid", trainingController.removetraining);

module.exports = router;