const User = require("../models/userDB");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Compare the entered password with the hashed password in the database
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, `${process.env.SECREAT_KEY}`);
  
      res.status(200).send({token});

    } catch (error) {
      res.status(500).send(error);
    }
  };

  module.exports = userLogin;