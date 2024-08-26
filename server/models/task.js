const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchema = new mongoose.Schema({
  createdBy: { type: String},
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String },
  createdBy: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: new Date() },
  dueDate: { type: Date, default: new Date() }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
