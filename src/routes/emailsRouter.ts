import { processEmailNotification } from "../utils";

const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/artistToSupplier', (req: any, res: any) => {
  "use strict";
  const processedObj = processEmailNotification(req.body);
  if (!processedObj) {res.status(401)};
  async function main() {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TEST_SENDER_GMAILUSER,
        pass: process.env.TEST_SENDER_GMAILPASSWORD,        
      },
    });
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
      to: processedObj.emailSender,
      subject: "Test notification", 
      text: "Hello from the server.",
      html: `<h4>${processedObj.message}<h4>`, 
    });
    console.log("Message sent: %s", info.messageId);  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.status(200)
  }
  main().catch(console.error);
})

module.exports = router;