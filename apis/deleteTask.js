const User = require("../models/userDB");
const dotenv = require('dotenv');
const Task = require('../models/tasksDB');
dotenv.config();

const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.userId;

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the task by ID
    console.log(taskId);
    const task = await Task.findById(taskId);
    console.log(task);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const adminId = task.admin;
    const assignedToId = task.assignedTo;

    // Remove task from admin's task list
    await User.findByIdAndUpdate(adminId, { $pull: { tasks: task._id } });

    // Remove task from assignedTo's task list if assignedTo is not null
    if (assignedToId) {
      await User.findByIdAndUpdate(assignedToId, { $pull: { tasks: task._id } });
    }

    // Delete the task
    await task.deleteOne();

    res.status(200).send({ message: "Deleted Successfully!" });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).send({ message: 'An error occurred while deleting the task' });
  }
};

module.exports = deleteTask;
