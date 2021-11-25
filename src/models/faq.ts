import mongoose from'mongoose'
const Schema = mongoose.Schema;

const faqSchema = new Schema({
  question: {
    type: String,
    required: true,
    min: 2,
    max: 300
  },
  answer: {
    type: String, 
    required: true, 
    min: 2, 
    max: 1000
  }
}, {timestamps: true});

const FAQ = mongoose.model('FAQ', faqSchema);
module.exports = FAQ;