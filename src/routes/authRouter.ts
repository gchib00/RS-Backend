const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

router.post('/register', (req: any, res: any) => {
  const newUser = new User({
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  });
  res.send(newUser)
});

module.exports = router;