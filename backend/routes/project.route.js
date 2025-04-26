import express from 'express'
import { createProject, deleteProject, getProjects } from '../controllers/project.controller.js'
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

router.get('/', verifyToken, getProjects);
router.post('/', verifyToken, createProject);
router.delete('/:projectId', verifyToken, deleteProject);

export default router