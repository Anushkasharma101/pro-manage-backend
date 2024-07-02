const User = require("../models/userDB");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

const userRegister = async (req, res) => {
    try {
      const { username,email,password } = req.body;
      // Hash the password before saving it to the database
      const hashedPassword = await bcrypt.hash(password, 10);
    //   console.log(hashedPassword)
  const alreadyUser = await User.findOne({email});
  const alreadyUserName = await User.findOne({username});
  let token = "";
if(alreadyUserName){
  return res.status(404).json({error:"Username Already Exists"});
}
  if(alreadyUser !== null){
  if(alreadyUser.password !== "no password"){
    return res.status(404).json({error:"User Already Exists"});
  }
  alreadyUser.username = username;
  alreadyUser.password =  hashedPassword;
  alreadyUser.save();
  token = jwt.sign({ userId: alreadyUser._id }, `${process.env.SECREAT_KEY}`);
  }else{
    const user = new User({
      username,
      email,
      password:hashedPassword
    });
   
    await user.save();
    token = jwt.sign({ userId: user._id }, `${process.env.SECREAT_KEY}`);

  }
      

      return res.status(200).json({ message: "user created successfully",token});
    } catch (error) {
        console.log(error)
      return res.status(400).json({error: error});
    }
  };

  module.exports = userRegister;