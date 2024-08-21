// src/routes/users.js
const express = require('express');
const router = express.Router();
const {handleGetTasks, handleAddNewTask} = require('../controllers/task.js');
// Get all tasks
router.get('/get', handleGetTasks);

// Create a new task
router.post('/add', handleAddNewTask);

module.exports = router;
