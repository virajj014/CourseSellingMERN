require('dotenv').config();
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("./db/conn");
const enrollRouter = require("./routers/enrollRouter");
const adminRouter = require("./routers/adminRouter");
const courseRouter = require("./routers/courseRouter");
const otpRouter = require("./routers/otpRouter");
const kycRouter = require("./routers/kycRouter");
const invoiceRouter = require("./routers/invoiceRouter");
const offerRouter = require("./routers/offerRouter");
const marketingtoolRouter = require("./routers/marketingtoolRouter");
const trainingRouter = require("./routers/trainingRouter");
const webinarRouter = require("./routers/webinarRouter");
const commonRouter = require("./routers/commonRouter");
const homeCarouselRouter = require("./routers/homecarouselRouter");






const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/enroll', enrollRouter);
app.use('/admin', adminRouter);
app.use('/course', courseRouter);
app.use('/otp', otpRouter);
app.use('/kyc', kycRouter);
app.use('/invoice', invoiceRouter);
app.use('/offer', offerRouter);
app.use('/marketingtool', marketingtoolRouter);
app.use('/training', trainingRouter);
app.use('/webinar', webinarRouter);
app.use('/common', commonRouter);
app.use('/carouseldata', homeCarouselRouter);









app.listen(port, () => {
    console.log(`on port ${port}`);
});