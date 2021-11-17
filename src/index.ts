import express from 'express';
import mongoose from 'mongoose';
const employeesRouter = require('./routes/employeesRouter');
const authRouter = require('./routes/authRouter');

const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const env = require('dotenv');
env.config();

mongoose.connect(process.env.MONGODB_CONNECT as string)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.error(error));
const PORT = 3005;

app.use('/employees', employeesRouter);
app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

//404 page:
app.use((_req, res) => {
  res.status(404).send('404');
});