import express, { Router } from 'express'
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/taskController.js'

const routerTask = express.Router()

routerTask.get('/', getTasks)

routerTask.post('/', createTask)

routerTask.patch('/:id', updateTask)

routerTask.delete('/:id', deleteTask)

export default routerTask