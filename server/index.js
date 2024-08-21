// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8081;
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');

// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());
// Connect to MongoDB
mongoose.connect('mongodb+srv://jeelpatel1212:jeelpatel1212@cluster0.ipz1skx.mongodb.net/TaskManagement?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

// Use routes
app.use('/task', taskRoutes);
app.use('/user', userRoutes);

// Start the server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
