const User = require("../models/userDB");

const getUserDetails = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    const completeDetail = await User.findById(userId).populate({
      path: "tasks",
      model: "Task",
    });

    let todo = [];
    let backlog = [];
    let inProgress = [];
    let done = [];
    for (let i = 0; i < completeDetail.tasks.length; i++) {
      const task = completeDetail.tasks[i];
      if (task.category === "To do") {
        todo.push(task);
      }
      if (task.category === "Backlog") {
        backlog.push(task);
      }
      if (task.category === "In progress") {
        inProgress.push(task);
      }
      if (task.category === "Done") {
        done.push(task);
      }
    }

    return res
      .status(200)
      .json({
        username: user.username,
        email: user.email,
        assignedUsers: user.assignedUsers,
        todo: todo,
        backlog: backlog,
        inProgress: inProgress,
        done: done,
      });
  } catch (error) {
    return res.status(400).json({error: error});
  }
};

module.exports = getUserDetails;
