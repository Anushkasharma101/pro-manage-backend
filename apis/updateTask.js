const dotenv = require('dotenv');
const Task = require("../models/tasksDB");
const User = require('../models/userDB');
dotenv.config();

const updateTask = async (req, res) => {

    try {

        const taskId = req.params.id;
        const userId = req.user.userId;
        const { title, priority, assignedTo, checkList, dueDate,} = req.body;
        const task = await Task.findById(taskId);
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        if(!task){
            return res.status(404).json({message:"Task Not Found"});
        }

        if(title!== undefined){

            await Task.findOneAndUpdate(
                { _id: taskId },
                { title },
                { new: true } // Return the updated document
              );
        }
        if(priority!== undefined){
            await Task.findOneAndUpdate(
                { _id: taskId },
                { priority },
                { new: true } // Return the updated document
              );
        }
        if(assignedTo!== undefined){
            if (userId === task.admin) {
                const previousAssignedUser = await User.findById(task.assignedTo);
                  const newAssignedUser = await User.findOne({ email: assignedTo });
          
                  if (!newAssignedUser) {
                    return res.status(404).json({ message: "New assigned user not found" });
                  }
          
                  // Update task
                  await Task.findOneAndUpdate(
                    { _id: taskId },
                    { assignedTo: newAssignedUser._id },
                    { new: true } // Return the updated document
                  );
          
                  // Remove task from previous assignee's assignedUsers (if it exists)
                  if (previousAssignedUser) {
                    await User.findByIdAndUpdate(
                      previousAssignedUser._id,
                      { $pull: { tasks: taskId } } // Remove task using pull operator
                    );
                  }
                } else{
                return res.status(404).json({ msg: "Oops, You Dont Have Access To Update Assigned User" });
            }
        }
            
        
        if(checkList!== undefined){
            await Task.findOneAndUpdate(
                { _id: taskId },
                { checkList },
                { new: true } // Return the updated document
              );
        }
        if(dueDate!== undefined){
            await Task.findOneAndUpdate(
                { _id: taskId },
                { dueDate },
                { new: true } // Return the updated document
              );
        }
          
      return res.status(200).json({ msg: "Task Updated Successfully" });

    } catch (error) {
        console.log(error)
      return res.status(400).send(error);
    }
  };

  module.exports = updateTask;