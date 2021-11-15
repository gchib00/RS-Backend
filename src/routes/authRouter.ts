import { processNewUser } from "../utils";

const express = require('express');
const router = express.Router();
const User = require('../models/user'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//REGISTRATION:
const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
}
router.post('/register', async (req: any, res: any) => {
  try {
    const processedUser = processNewUser(req.body);
    const newUser = new User({
      username: processedUser.username,
      password: await hashPassword(processedUser.password),
      email: processedUser.email,
      adminRights: processedUser.adminRights
    });
    //Before trying to save, make sure that user doesn't already exist in DB:
    const username = await User.findOne({username: processedUser.username});
    const email = await User.findOne({email: processedUser.email});
    if(username){return res.status(400).send('User already exists')};
    if(email){return res.status(400).send('User by this email is already registered')};
    await newUser.save();
    res.send(newUser);
  } catch (err) {
    res.status(500).send(`${err}`)
  }
});

//LOGIN:
router.post('/login', async (req: any, res: any) => {
  try {
    // await bcrypt.compare(entry, user.password)
    const user = await User.findOne({name: req.body.name});
    const match: boolean = await bcrypt.compare(req.body.password, user.password);
    if(match){
      const token = jwt.sign({_id: user._id}, process.env.SECRET_VALUE_FOR_TOKEN);
      res.header('auth-token', token).send(token);
    } else {
      res.status(401).send('Username or password is incorrect');
    };
  } catch {
    res.status(501)
  }
});

module.exports = router;