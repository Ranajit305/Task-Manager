import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js'

const router = express.Router();

router.get('/:projectId', verifyToken, getTasks);
router.post('/:projectId', verifyToken, createTask);
router.put('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

export default router