// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 8081;
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const JWT_SECRET = 'qwertyuioplkjhgaSsas#^%$XFCaa';
const jwt = require('jsonwebtoken');
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


const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("checl aee", decoded)
      req.user = decoded;
      next();
  } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
  }
};

// Use routes
app.use('/task',authenticateJWT, taskRoutes);
app.use('/user', userRoutes);

// Start the server 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
