import Task from "../models/task.model.js"
import Project from "../models/project.model.js"

export const getTasks = async (req, res) => {
    try {
      const { projectId } = req.params; 
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not Found' });
      }

      const tasks = await Task.find({ projectId: projectId });
      res.status(200).json({ success: true, tasks });
    } catch (error) {
       res.status(500).json({ success: false, message: error.message });
    }
};

export const createTask = async (req, res) => {
    try {
      const { projectId } = req.params; 
      const { title, description } = req.body; 
  
      const project = await Project.findById(projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      if (!title || !description) {
        return res.status(400).json({ success: false, message: 'Enter all Details' })
      }

      const newTask = new Task({
        title,
        description,
        status: 'ongoing',
        projectId
      });

      await newTask.save();
      res.status(201).json({ success: true, message: 'Task created successfully', task: newTask });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
  
export const updateTask = async (req, res) => {
    try {
      const { taskId } = req.params; 
      const { title, description, status } = req.body; 
      if (!title || !description || !status) {
        return res.status(400).json({ success: false, message: 'Provide all Details' })
      }
  
      const task = await Task.findById(taskId);
  
      if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found for this project' });
      }  

      const project = await Project.findById(task.projectId);
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }

      if (project.author.toString() !== req.user._id.toString()) {
        return res.status(400).json({ success: false, message: 'Unauthorized - Access Denied' });
      }

      await Task.findByIdAndUpdate(
        taskId,
        { title, description, status }, 
        { new: true });

      res.status(200).json({ success: true, message: 'Task updated successfully', task });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
};
  
export const deleteTask = async (req, res) => {
    try {
        const { taskId } = req.params;
    
        const task = await Task.findById(taskId);
        if (!task) {
        return res.status(404).json({ success: false, message: 'Task not found for this project' });
        }

        const project = await Project.findById(task.projectId);
        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not Found' });
        }

        if (project.author.toString() !== req.user._id.toString()) {
            return res.status(400).json({ success: false, message: 'Unauthorized - Access Denied' });
        }
    
        await Task.findByIdAndDelete(taskId);
        res.status(200).json({ success: true, message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
};