import Project from "../models/project.model.js"
import Task from "../models/task.model.js"

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find({ author: req.user._id });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
}

export const createProject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ success: false, message: 'Name not Provided' });
    }

    const projectCount = await Project.countDocuments({ author: req.user._id });

    if (projectCount === 4) {
      return res.status(400).json({ success: false, message: 'Projects limit reached' });
    }

    const newProject = new Project({
      name,
      author: req.user._id
    });

    await newProject.save();
    return res.status(201).json({ success: true, message: 'Project created successfully', project: newProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProject = async (req, res) => {
    try {
      const { projectId } = req.params;
      const project = await Project.findById(projectId); 
  
      if (!project) {
        return res.status(404).json({ success: false, message: 'Project not found' });
      }
  
      if (project.author.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, message: 'Unauthorized - Access Denied' });
      }
  
      await Promise.all([Project.findByIdAndDelete(projectId), Task.deleteMany({ projectId: projectId })]);
      return res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
};