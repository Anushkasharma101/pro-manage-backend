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
        if(assignedTo === user.email){
          return res.status(404).json({message:"You Cannot Assign Task To Yourself"});
        }
        if(assignedTo!== undefined){

            if (userId === task.admin.toString()) {
                const previousAssignedUser = await User.findById(task.assignedTo);
                  const newAssignedUser = await User.findOne({ email: assignedTo });
        

                  if (!newAssignedUser) {
                    return res.status(404).json({ message: "New assigned user not found" });
                  }
          
                  // Update task
                 const taskAssigned = await Task.findOneAndUpdate(
                    { _id: task._id },
                    { assignedTo: newAssignedUser._id },
                    { new: true } // Return the updated document
                  );

                  // Remove task from previous assignee's assignedUsers (if it exists)
                  if (previousAssignedUser && task.assignedTo!== null) {
                    await User.findByIdAndUpdate(
                      {_id: previousAssignedUser._id},
                      { $pull: { tasks: taskAssigned._id } } // Remove task using pull operator
                    );
                    await newAssignedUser.tasks.push(task._id);
                  }else{
                    await newAssignedUser.tasks.push(task._id);
                  }
                  await newAssignedUser.save();
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