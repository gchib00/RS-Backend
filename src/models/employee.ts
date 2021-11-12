import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  department: {type: String, required: true},
  type: String,
  team: String,
  subDepartment: String,
  email: {type: String, required: true},
  phone: String || Number,
  status: {type: String, required: true},
  shift: {
    start: String,
    length: Number
  }
}, {timestamps: true});

const Employee = mongoose.model('Employee', employeeSchema);
module.exports = Employee;