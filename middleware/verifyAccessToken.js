const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config();

//middleware responsible for decrypting token having sensitive information such as userId
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization');
  let bearerToken = token.split(" ")[1];
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. Token not provided.' });
  }

  try {
    const decoded = jwt.verify(bearerToken, `${process.env.SECREAT_KEY}`);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;

