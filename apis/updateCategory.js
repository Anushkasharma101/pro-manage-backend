const dotenv = require('dotenv');
const Task = require("../models/tasksDB");
dotenv.config();

const updateCategory = async (req, res) => {

    try {

        const taskId = req.params.id;
        const { category } = req.body;
        if (!category) {
          return res.status(400).send('Category Is Required');
        }
          const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            { category },
            { new: true } // Return the updated document
          );
      
          if (!updatedTask) {
            return res.status(404).send('Task not found');
          }
      return res.status(200).json({ msg: "Category Updated Successfully" });

    } catch (error) {
        console.log(error)
      return res.status(400).send(error);
    }
  };

  module.exports = updateCategory;