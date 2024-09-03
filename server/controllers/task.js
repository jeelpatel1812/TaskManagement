
const Task = require('../models/task.js');
const handleGetTasks = async (req, res) => {
    try {
      const tasks = await Task.find({createdBy: req.userId});
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const handleAddNewTask = async (req, res) => {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      createdBy: req.userId,
      createdAt: new Date(),
      dueDate: new Date(),
    });
  
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

const handleUpdateTask = async (req, res) => {
    const taskId = req.params.id;
    console.log("check id", taskId)
  
    try {
      const newTask = await Task.findByIdAndUpdate({_id: taskId},
        {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        createdBy: req.userId,
        createdAt: new Date(),
        dueDate: req.body.dueDate,
      });
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

const handleUpdateTaskStatus = async (req, res) => {
    const taskId = req.params.id;
  
    try {
      const newTask = await Task.findByIdAndUpdate({_id: taskId},
        {
        status: req.body.status
      });
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

const handleDeleteTask = async (req, res) => {
   try{
     const taskId = req.params.id;
     const deletedTask = await Task.deleteOne({_id:taskId});
     res.status(201).json(deletedTask);
   }
   catch(err){
      res.status(400).json({ message: err.message });
   }
}

module.exports = {handleGetTasks, handleAddNewTask, handleUpdateTask, handleDeleteTask, handleUpdateTaskStatus};