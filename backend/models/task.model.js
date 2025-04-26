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
      default: 'pending'
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    }
}, { timestamps: true });

const Task =  mongoose.models.Task || mongoose.model('Task', taskSchema);
export default Task