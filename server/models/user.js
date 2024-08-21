const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true},
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
  },
  password:{
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: new Date() }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
