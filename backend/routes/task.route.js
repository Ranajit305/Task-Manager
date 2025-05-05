import express from 'express'
import { verifyToken } from '../utils/verifyToken.js'
import { createTask, deleteTask, getTasks, updateTask } from '../controllers/task.controller.js'

const router = express.Router();

router.get('/', verifyToken, getTasks);
router.post('/', verifyToken, createTask);
router.put('/:taskId', verifyToken, updateTask);
router.delete('/:taskId', verifyToken, deleteTask);

export default router