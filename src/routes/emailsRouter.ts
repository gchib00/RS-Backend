import { MessageToSupplier } from "../types";
import { Request, Response } from 'express';
import { processEmailNotification } from "../utils";
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const multer = require('multer');

///TESTING :
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
  console.log('from frontend:')
  console.log(req.file)

  "use strict";
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
        to: 'chibukhashviligiorgi@gmail.com',
        subject: `[TEST] Image #000000000_00000`, 
        text: "Hello from the server.",
        html: `<h4>This email should contain an image attachment<h4>`, 
        attachments: [{
          filename: req.file.filename,
          path: req.file.path
        }]
      });
      console.log("Message sent: %s", info.messageId);  
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      console.log()
      res.status(201).send('Image was sent successfully');
    } catch (err) { 
      console.log(err)
      res.status(401).send(err)
    }
  }
  main().catch(console.error);
});

//////////


router.post('/artistToSupplier', (req: Request, res: Response) => {
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
      if (req.body.type === 'message') { //create text-message specific email body if type === message 
        let info = await transporter.sendMail({
          from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
          to: processedObj.emailSender,
          subject: `Test notification regarding order #${processedObj.orderID}`, 
          text: "Hello from the server.",
          html: `<h4>${processedObj.message}<h4>`, 
        });
        console.log("Message sent: %s", info.messageId);  
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        res.status(201).send('Message was sent successfully');
      }
      if (req.body.type === 'image') { //create email body with an attachment if type === image 
        // let info = await transporter.sendMail({
        //   from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
        //   to: processedObj.emailSender,
        //   subject: `[TEST] Image uploaded for order #${processedObj.orderID}`, 
        //   text: "Hello from the server.",
        //   html: `<h4>${processedObj.message}<h4>`, 
        //   attachments: [{
        //     filename: 'image.jpg',
        //     path: ''
        //   }]
        // });
        // console.log("Message sent: %s", info.messageId);  
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        

        //testing zone:
        console.log('req.body: ');
        console.log(req.body);
        /////////////
        res.status(201).send('Image was sent successfully');
      }
    } catch (err) { 
      res.status(401).send(err)
    }
  }
  main().catch(console.error);
});

router.post

module.exports = router;