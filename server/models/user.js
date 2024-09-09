const mongoose = require('mongoose');
const { Schema } = mongoose;
const OrganizationModel = require('./organization.js');
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
  organization :{ 
    type: Schema.Types.ObjectId, 
    required: true, 
    ref: OrganizationModel
  },
  createdAt: { type: Date, default: new Date() }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
