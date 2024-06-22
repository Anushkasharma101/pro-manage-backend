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
  const alreadyUser = await User.findOne({email});
  const alreadyUserName = await User.findOne({username});

if(alreadyUserName){
  return res.status(404).json({message:"Username Already Exists"});
}
  if(alreadyUser !== null){
  if(alreadyUser.password !== "no password"){
    return res.status(404).json({message:"User Already Exists"});
  }
  alreadyUser.username = username;
  alreadyUser.password =  hashedPassword;
  alreadyUser.save();
  }else{
    const user = new User({
      username,
      email,
      password:hashedPassword
    });
   
    await user.save();
    
  }
      
 
      // Include the token in the response
      console.log("successfully created user");
      return res.status(200).json({ msg: "user created successfully" });
    } catch (error) {
        console.log(error)
      return res.status(400).send(error);
    }
  };

  module.exports = userRegister;