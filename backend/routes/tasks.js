import express, { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask } from './controllers/taskController.js'
import auth from '../middleware/auth.js'

const routerTask = express.Router()

routerTask.get('/', auth, getTasks)

routerTask.post('/', auth, createTask)

routerTask.patch('/:id', auth, updateTask)

routerTask.delete('/:id', auth, deleteTask)

export default routerTask