import mongoose from "mongoose"

const taskSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
      type: String,
      enum: ['ongoing', 'paused', 'completed'],
      default: 'ongoing'
    },
    priority: {
      type: String,
      enum: ['High', 'Medium', 'Low'],
      required: true
    },
    dueDate: {
      type: Date,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
}, { timestamps: true });

const Task =  mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task