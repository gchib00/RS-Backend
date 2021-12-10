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

app.get('/sendTestEmail', () => {
  // using Twilio SendGrid's v3 Node.js Library
  // https://github.com/sendgrid/sendgrid-nodejs
  const sgMail = require('@sendgrid/mail')
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  console.log('recipient ========', process.env.TEST_RECIPIENT)
  console.log('sender ========', process.env.TEST_SENDER)
  const msg = {
    to: process.env.TEST_RECIPIENT, // Change to your recipient
    from: process.env.TEST_SENDER, // Change to your verified sender
    subject: 'Test email using SendGrid',
    text: 'This is test text',
    html: '<strong>second test email</strong>',
  }
  sgMail
  .send(msg)
  .then(() => {
    return console.log('Email sent')
  })
  .catch((error: any) => {
    return console.error(error)
  })
})

//404 page:
app.use((_req, res) => {
  res.status(404).send('404');
});