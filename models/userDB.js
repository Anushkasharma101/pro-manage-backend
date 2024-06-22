const mongoose = require("mongoose");

//user database
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
  ],
  assignedUsers:[
    {
      type: String
    }
  ]
});

const User = new mongoose.model("User", userSchema);

module.exports = User;
