const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    admin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    priority: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    checkList: [{
            checked:{
                type: Boolean,
                default:false
            },
            checkListTitle:{
                type: String,
                required:true
            }
        }],
        creationDate:{
            type: String
        },
    dueDate: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: 'To do'
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
