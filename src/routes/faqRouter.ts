import { FAQItem } from "../types";
import { Request, Response } from 'express';
const express = require('express');
const router = express.Router();
const FAQ = require('../models/faq');
import { processNewFAQItem } from '../utils';

router.get('/', async (_req: Request, res: Response) => {
  const AllFAQItems: Array<FAQItem> = await FAQ.find({});
  res.send(AllFAQItems);
});

router.post('/add', async (req: Request, res: Response) => {
  try {
    const processedObject = processNewFAQItem(req.body);
    const newFAQItem = new FAQ({
      question: processedObject.question,
      answer: processedObject.answer
    });
    await newFAQItem.save();
    const updatedFAQ = await FAQ.find({});
    return res.status(200).send(updatedFAQ);
  } catch(err) {
    return res.status(401).send(`${err}`);
  }
});

router.delete('/delete/:question', async (req: Request, res: Response) => {
  try {
    await FAQ.deleteOne({question: req.params.question});
    const updatedFAQ = await FAQ.find({});
    res.status(201).send(updatedFAQ)
  } catch (err) {
    res.status(401).send(`${err}`)
  }
})


module.exports = router;