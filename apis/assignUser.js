const User = require("../models/userDB");
const dotenv = require('dotenv');
dotenv.config();

const assignUser = async (req, res) => {

    try {
      const {email} = req.body;

    const userId = req.user.userId;
    console.log(userId)
    const user = await User.findOne({ email });
    const admin = await User.findById(userId);
    if (!admin) {
        return res.status(404).json({ message: 'Admin Not Found' });
    }
    for(let i=0;i<admin.assignedUsers.length;i++){
      if(email === admin.assignedUsers[i]){
        return res.status(404).json({ message: 'User Already Added' });
      }
    }

    if (!user) {
        const newUser = new User({
            email,
            password:'no password'
          });

          admin.assignedUsers.push(newUser.email);
          newUser.save()

    }else{
        admin.assignedUsers.push(user.email);
    }
      
      admin.save();
      // Include the token in the response
      res.status(200).send({ msg: "User Assigned Successfully" });
    } catch (error) {
      res.status(400).send(error);
      console.log(error);
    }
  };

  module.exports = assignUser;
