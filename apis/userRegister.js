const User = require("../models/userDB");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const userRegister = async (req, res) => {
    try {
      const { username,email,password } = req.body;
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
    //   console.log(hashedPassword)
  
      const user = new User({
        username,
        email,
        password:hashedPassword
      });
  
      await user.save();
      // Include the token in the response
      console.log("successfully created user", user);
      return res.status(200).json({ msg: "user created successfully" });
    } catch (error) {
        console.log(error)
      return res.status(400).send(error);
    }
  };

  module.exports = userRegister;