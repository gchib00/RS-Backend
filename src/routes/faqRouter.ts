import { FAQItem } from "../types";
const express = require('express');
const router = express.Router();
const FAQ = require('../models/faq');
import { processNewFAQItem } from '../utils';


router.get('/', async (_req: any, res: any) => {
  const AllFAQItems: Array<FAQItem> = await FAQ.find({});
  res.send(AllFAQItems);
});

router.post('/add', async (req: any, res: any) => {
  const processedObject = processNewFAQItem(req.body);
  const newFAQItem = new FAQ({
    question: processedObject.question,
    answer: processedObject.answer
  });
  if (!newFAQItem.question || !newFAQItem.answer) {throw new Error('Question or answer is missing')};
  await newFAQItem.save();
  const updatedFAQ = await FAQ.find({});
  res.status(200).send(updatedFAQ)
});


module.exports = router;