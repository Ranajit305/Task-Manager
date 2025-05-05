import mongoose from 'mongoose';
import Task from '../models/task.model.js';
import User from '../models/user.model.js';

export const getTasks = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({
      $or: [
        { createdBy: new mongoose.Types.ObjectId(userId) },
        { assignedTo: new mongoose.Types.ObjectId(userId) }
      ]
    }).populate([
      { path: 'createdBy', select: 'name' },
      { path: 'assignedTo', select: 'name' }
    ]);
    res.status(200).json({ success: true, tasks });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo } = req.body;

    if (!title || !description || !priority || !dueDate || !assignedTo) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const assignedUser = await User.findById(assignedTo);
    if (!assignedUser) {
      return res.status(404).json({ success: false, message: 'Assigned user not found' });
    }

    const newTask = new Task({
      title,
      description,
      priority,
      dueDate,
      assignedTo,
      createdBy: req.user._id
    });

    await newTask.save();
    await newTask.populate([
      { path: "createdBy", select: "name" },
      { path: "assignedTo", select: "name" }
    ]);

    res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    const isOwner = task.createdBy.toString() === req.user._id.toString();

    if (isOwner) {
      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { title, description, status, priority, dueDate },
        { new: true }
      );

      return res.status(200).json({ success: true, message: 'Task updated successfully', task: updatedTask });

    } else {
      if (!status) {
        return res.status(403).json({ success: false, message: 'Unauthorized - Only status can be updated by non-owners' });
      }

      const updatedTask = await Task.findByIdAndUpdate(
        taskId,
        { status },
        { new: true }
      );

      return res.status(200).json({ success: true, message: 'Task status updated successfully', task: updatedTask });
    }

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    if (task.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized - You can only delete your own tasks' });
    }

    await Task.findByIdAndDelete(taskId);
    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};