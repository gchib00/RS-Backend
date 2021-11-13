import { processNewUser } from "../utils";

const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}

router.post('/register', async (req: any, res: any) => {
  const processedUser = processNewUser(req.body);
  const newUser = new User({
    username: processedUser.username,
    password: await hashPassword(processedUser.password),
    email: processedUser.email,
    adminRights: processedUser.adminRights
  });
  const processRequest = async () => {
    try {
      //Before trying to save, make sure that user doesn't already exist in DB:
      const username = await User.findOne({username: processedUser.username});
      const email = await User.findOne({email: processedUser.email});
      if(username){return res.status(400).send('User already exists')};
      if(email){return res.status(400).send('User by this email is already registered')};
      await newUser.save();
      res.send(newUser);
    } catch {
      res.status(401);
    }
  };
  processRequest();
});

module.exports = router;