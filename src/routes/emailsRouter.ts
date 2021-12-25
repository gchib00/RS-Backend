import { ImageToSupplier, MessageToSupplier } from "../types";
import { Request, Response } from 'express';
import { processEmailImage, processEmailNotification } from "../utils";
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require('multer');

//Endpoint for sending a simple text message to supplier (text-email without attachments):
router.post('/artistToSupplier/message', (req: Request, res: Response) => {
  "use strict";
  const processedObj: MessageToSupplier = processEmailNotification(req.body) as MessageToSupplier;
  if (!processedObj) {res.status(401)}; 
  async function main() { //send mail with defined transport object
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TEST_SENDER_GMAILUSER,
        pass: process.env.TEST_SENDER_GMAILPASSWORD        
      },
    });
    try {
      let info = await transporter.sendMail({
        from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
        to: processedObj.emailSender, //atm the app is supposed to send this email body back to the original sender, not the supplier
        subject: `Test notification regarding order #${processedObj.orderID}`, 
        text: "Hello from the server.",
        html: `<h4>${processedObj.message}<h4>`, 
      });
      console.log("Message sent: %s", info.messageId);  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(201).send('Message was sent successfully');
    } catch (err) { 
      res.status(401).send(err)
    }
  }
  main().catch(console.error);
});

//Endpoint for sending an image to supplier (email with attachment):
//Create a temporary storage for uploaded images:
const uploadStorage = multer.diskStorage({
  destination: (_req: Request, _file: File, cb: any) => {
    cb(null, './uploads')
  },
  filename: (_req: Request, file: any, cb: any) => {
    cb(null, file.originalname)
  }
});
const upload = multer({storage: uploadStorage}); 
router.post('/artistToSupplier/image', upload.single('image'), (req: any, res: Response) => {
  //validate the data:
  const processedObj: ImageToSupplier = processEmailImage(req.body, req.file) as ImageToSupplier;
  "use strict";
  async function main() { //send mail with defined transport object
    //create transport object:
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TEST_SENDER_GMAILUSER,
        pass: process.env.TEST_SENDER_GMAILPASSWORD        
      },
    });
    try {
      //create email body:
      let info = await transporter.sendMail({
        from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
        to: processedObj.emailSender, //atm the app is supposed to send this email body back to the original sender, not the supplier
        subject: `[TEST] Image for order #${processedObj.orderID}`, 
        text: "Hello from the server.",
        html: `<h4>Find an image attached below.<h4>`, 
        attachments: [{
          filename: processedObj.file.filename,
          path: processedObj.file.path
        }]
      });
      console.log("Message sent: %s", info.messageId);  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      res.status(201).send('Image was sent successfully');
    } catch (err) { 
      console.error(err)
      res.status(401).send(err)
    }
  }
  main().catch(console.error);
});

module.exports = router;