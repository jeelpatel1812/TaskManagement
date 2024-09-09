// src/routes/users.js
const express = require('express');
const router = express.Router();
const {handleAddNewOrg} = require('../controllers/organization.js')

// Add new org
router.get('/add', handleAddNewOrg);
module.exports = router;
