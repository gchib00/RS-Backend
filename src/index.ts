import express from 'express';
import mongoose from 'mongoose';
const employeesRouter = require('./routes/employeesRouter');
const authRouter = require('./routes/authRouter');
const faqRouter = require('./routes/faqRouter');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB_CONNECT as string)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.error(error));
const PORT = process.env.PORT || 3005;

app.use(express.static('build'))
app.use('/employees', employeesRouter);
app.use('/auth', authRouter);
app.use('/faq', faqRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get('/sendTestEmail', (_req, _res) => {
  "use strict";
  const nodemailer = require("nodemailer");
  async function main() {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.TEST_SENDER_GMAILUSER,
        pass: process.env.TEST_SENDER_GMAILPASSWORD ,
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Giorgi" <${process.env.TEST_SENDER_GMAILUSER}>`, 
      to: "chibukhashviligiorgi@gmail.com",
      subject: "My test email", 
      text: "Hello from nodejs",
      html: "<h4>Hey, this is a test email.</h4>", 
    });
    console.log("Message sent: %s", info.messageId);  
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }
  
  main().catch(console.error);
})

//404 page:
app.use((_req, res) => {
  res.status(404).send('404');
});