// src/routes/users.js
const express = require('express');
const router = express.Router();
const {handleGetTasks, handleAddNewTask, handleUpdateTask, handleDeleteTask, handleUpdateTaskStatus} = require('../controllers/task.js');
// Get all tasks
router.get('/get', handleGetTasks);

// Create a new task
router.post('/add', handleAddNewTask);

// Update a task
router.put('/update/:id', handleUpdateTask);

router.patch('/updateStatus/:id', handleUpdateTaskStatus);

// Delete a task 
router.delete('/delete/:id', handleDeleteTask);

module.exports = router;
