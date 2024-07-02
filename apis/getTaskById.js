const dotenv = require('dotenv');
const Task = require("../models/tasksDB");
dotenv.config();

const getTaskById = async (req, res) => {

    try {
        const taskId = req.params.id;

        if(!taskId){
            return res.status(404).json({error: 'Task Id Not Found'});
        }
        const task = await Task.findById(taskId);
      
          if (!task){
            return res.status(404).json({error: 'Task not found'});
          }
      return res.status(200).json({ task: task });

    } catch (error) {
        console.log(error)
      return res.status(400).json({error: error});
    }
    
  };

  module.exports = getTaskById;