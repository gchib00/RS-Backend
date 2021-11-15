const jwt = require('jsonwebtoken');
 
const authenticateUser = (req: any, res: any, next:any) => {
  const token = req.header('auth-token');
  if(!token){
    return res.status(401).send('Requires authentication');
  };
  const verifiedToken = jwt.verify(token, process.env.SECRET_VALUE_FOR_TOKEN);
  if(!verifiedToken){
    return res.status(400).send('Token not found');
  };
  req.user = verifiedToken;
  next();
};

module.exports = authenticateUser;