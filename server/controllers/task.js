
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

module.exports = {handleGetTasks, handleAddNewTask};