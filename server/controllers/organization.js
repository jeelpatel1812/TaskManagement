
const Organization = require('../models/organization.js');

const handleGetOrgs = async (req, res) => {
    try {
      const tasks = await Organization.find({createdBy: req.userId});
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
}

const handleAddNewOrg = async (req, res) => {
    const task = new Organization({
      name: req.body.name,
      email: req.body.email
    });
  
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

const handleUpdateOrg = async (req, res) => {
    const taskId = req.params.id;
    console.log("check id", taskId)
  
    try {
      const newTask = await Organization.findByIdAndUpdate({_id: taskId},
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

const handleDeleteorg = async (req, res) => {
   try{
     const taskId = req.params.id;
     const deletedTask = await Organization.deleteOne({_id:taskId});
     res.status(201).json(deletedTask);
   }
   catch(err){
      res.status(400).json({ message: err.message });
   }
}

module.exports = {handleAddNewOrg, handleGetOrgs};