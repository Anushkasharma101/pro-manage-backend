const dotenv = require("dotenv");
const Task = require("../models/tasksDB");
dotenv.config();

const updateCheckMark = async (req, res) => {
  try {
    const taskId = req.params.id;
    const { indexOfCheck } = req.body;
    if (indexOfCheck === undefined) {
      return res.status(400).send("Index Of Check Is Required");
    }
    
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).send("Task not found");
    }

    if (indexOfCheck >= task.checkList.length || indexOfCheck < 0) {
      return res.status(400).send("Invalid Index");
    }
    task.checkList[indexOfCheck].checked =
      !task.checkList[indexOfCheck].checked;

    await task.save();
    return res.status(200).json({ msg: "Check/Uncheck Successfully" });

  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
};

module.exports = updateCheckMark;
