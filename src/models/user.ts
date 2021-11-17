import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    min: 3,
    max: 30
  },
  password: {
    type: String,
    required: true,
    min: 4,
    max: 300
  },
  email: {
    type: String,
    required: true
  },
  adminRights: {
    type: Boolean,
    required: true
  }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;