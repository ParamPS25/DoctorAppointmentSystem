require("dotenv").config();
const nodemailer = require("nodemailer");

const nodemailerAuth = nodemailer.createTransport({
    service : "gmail",
    secure : true,
    port : 465,
    auth:{
        user : "bhavsarparam1940@gmail.com",
        pass : process.env.MAIL_PASS,
    }
});

module.exports = nodemailerAuth



