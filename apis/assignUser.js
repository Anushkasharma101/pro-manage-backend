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
        return res.status(404).json({ error: 'Admin Not Found' });
    }
    if(admin.email === email){
      return res.status(500).json({error:"You cannot Assign to Yourself"});
    }
    for(let i=0;i<admin.assignedUsers.length;i++){
      if(email === admin.assignedUsers[i]){
        return res.status(404).json({ error: 'User Already Added' });
      }
    }
console.log('userrrrrr',user);
    if (user === null) {
        const newUser = new User({
            email,
            password:'no password'
          });

          await admin.assignedUsers.push(newUser.email);
          await newUser.save()

    }else{
       await admin.assignedUsers.push(user.email);
    }
      
      await admin.save();
      // Include the token in the response
      return res.status(200).json({ message: "User Assigned Successfully" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({error:error});
      
    }
  };

  module.exports = assignUser;
