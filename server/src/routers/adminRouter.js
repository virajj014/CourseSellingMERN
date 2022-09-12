const express = require("express");
const router = new express.Router();
const adminController = require("../controller/adminController");

router.post("/admin", adminController.createAdmin);
router.get("/admin",adminController.getAllAdmin);
router.get("/admin/:key/:value",adminController.getAdmin);
router.patch("/admin/:id",adminController.updateAdmin);
router.delete("/admin/:id",adminController.deleteAdmin);
router.post("/login", adminController.loginAdmin);

module.exports = router;