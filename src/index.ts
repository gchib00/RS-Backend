import express from 'express';
import mongoose from 'mongoose';
const employeesRouter = require('./routes/employeesRouter')

const app = express();
app.use(express.json());

const dbURI = `mongodb+srv://gchib00:uXF5aTzIBVdzXJgV@rs-cluster.j7uur.mongodb.net/employeesDB?retryWrites=true&w=majority`
mongoose.connect(dbURI)
  .then(() => console.log('connected to DB'))
  .catch((error) => console.error(error)) 

const PORT = 3000;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/employees', employeesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});