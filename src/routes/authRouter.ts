import { processNewUser } from "../utils";
import { Request, Response } from 'express';
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
router.post('/register', async (req: Request, res: Response) => {
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
    return res.send(newUser);
  } catch (err) {
    return res.status(500).send(`${err}`)
  }
});

//LOGIN:
router.post('/login', async (req: Request, res: Response) => {
  try {
    const userData = await User.findOne({username: req.body.username});
    const user = {
      _id: userData._id,
      username: userData.username,
      password: userData.password,
      email: userData.email,
      adminRights: userData.adminRights
    }
    const match: boolean = await bcrypt.compare(req.body.password, user.password);
    if(match){
      const token = jwt.sign({_id: user._id}, process.env.SECRET_VALUE_FOR_TOKEN);
      const responseData = {token: token, user: user}
      res.header('auth-token', token).send(responseData);
    } else {
      res.status(401).send('Username or password is incorrect');
    };
  } catch {
    res.status(401).send('Username or password is incorrect');
  }
});

//GET LOGGED USER:
router.post('/loggedUser', async (req: Request, res: Response) => {
  const token = req.body.token;
  if (token) {
    try {
      const authenticatedUser = await jwt.verify(token, process.env.SECRET_VALUE_FOR_TOKEN);
      const user = await User.find({_id: authenticatedUser._id});
      res.status(201).send(user);
    } catch (err) {
      res.status(405).send(`${err}`);
    }
  }
});

module.exports = router;