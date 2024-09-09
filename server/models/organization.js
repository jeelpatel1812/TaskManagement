const mongoose = require('mongoose');
const { Schema } = mongoose;
const organizationSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
  },
}, {timestamp : true});

const Organization = mongoose.model('Organization', organizationSchema);

module.exports = Organization;
