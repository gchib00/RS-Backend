import { MessageToSupplier } from "../types";
import { Request, Response } from 'express';
import { processEmailNotification } from "../utils";
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");

router.post('/artistToSupplier', (req: Request, res: Response) => {
  "use strict";
  const processedObj: MessageToSupplier = processEmailNotification(req.body) as MessageToSupplier;
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
      subject: `Test notification regarding order #${processedObj.orderID}`, 
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