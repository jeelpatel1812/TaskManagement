// src/index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const taskRoutes = require('./routes/task');
const userRoutes = require('./routes/user');
const organizationRoutes = require('./routes/organization');
const User = require('./models/user.js');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
// Middleware to parse JSON
app.use(express.json());
// Use CORS middleware
app.use(cors());
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));


const authenticateJWT = async (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
      return res.status(401).json({ message: 'Access denied.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = await User.findOne({email: decoded.email}).select('_id');
    next();
  } catch (error) {
      res.status(400).json({ message: 'Invalid token.' });
  }
};

// Use routes
app.use('/api/task',authenticateJWT, taskRoutes);
app.use('/api/user', userRoutes);
app.use('/api/organization',authenticateJWT,  organizationRoutes);

// Start the server 
app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
