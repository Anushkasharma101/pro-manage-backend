const dotenv = require('dotenv');
const Task = require("../models/tasksDB");
dotenv.config();

const updateCategory = async (req, res) => {

    try {

        const taskId = req.params.id;
        const { category } = req.body;
        if (!category) {
          return res.status(400).json({error:'Category Is Required'});
        }
          const updatedTask = await Task.findOneAndUpdate(
            { _id: taskId },
            { category },
            { new: true } // Return the updated document
          );
      
          if (!updatedTask) {
            return res.status(404).json({error:'Task not found'});
          }
      return res.status(200).json({ message: "Category Updated Successfully" });

    } catch (error) {
        console.log(error)
      return res.status(400).json({error: error});
    }
  };

  module.exports = updateCategory;