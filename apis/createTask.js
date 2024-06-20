const User = require("../models/userDB");
const dotenv = require("dotenv");
const Task = require("../models/tasksDB");

dotenv.config();

const createTask = async (req, res) => {
  try {
    const { title, priority, assignedTo = null, checkList, dueDate = null } = req.body;

    if (!title || !priority || !checkList) {
      return res.status(404).json({ message: "Missing Fields" });
    }
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    let assignedUserId = null;
    if (assignedTo !== null) {
      const assignedUser = await User.findOne({ email : assignedTo });
      if(assignedTo === user.email){
        return res.status(404).json({ message: "You cannot assign to yourself" });
      }
      if (!assignedUser) {
        return res.status(404).json({ message: "Assigned User Not Found" });
      }

      assignedUserId = assignedUser._id;

    }
    const task = new Task({
      admin: user._id,
      assignedTo: assignedUserId,
      priority,
      title,
      checkList,
      dueDate,
    });

    await task.save();
    await user.tasks.push(task._id);
    await user.save();
    if (assignedTo !== null) {
      const assignedUser = await User.findOne({ email: assignedTo });
      assignedUser.tasks.push(task._id);
      await assignedUser.save();
    }

    res.status(200).json({ message: "Task Successfully Created" });
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
  }
};

module.exports = createTask;
