const User = require("../models/userDB");
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const updateUserDetails = async (req, res) => {
    try {
      const { username,email,password, oldPassword } = req.body;
      // Hash the password before saving it to the database
    //   console.log(hashedPassword)
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if(oldPassword){
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordMatch) {
      return res.status(401).json({ message: 'Old Password Is Incorrect' });
    }}

    if(username){
        user.username = username
    }else if(password && oldPassword ){
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword
    }else {
        user.email = email;
    }
  
      await user.save();
      // Include the token in the response
      console.log("successfully updated user", user);
      return res.status(200).json({ msg: "User Updated Successfully" });
    } catch (error) {
        console.log(error)
      return res.status(400).send(error);
    }
  };

  module.exports = updateUserDetails;