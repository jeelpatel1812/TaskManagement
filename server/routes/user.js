// src/routes/users.js
const express = require('express');
const router = express.Router();
const {handleGetUser, handleAddNewUser} = require('../controllers/user.js')
// Get all users
router.get('/get', handleGetUser);

// Create a new user
router.post('/add', handleAddNewUser);

module.exports = router;
