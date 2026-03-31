import express, { Router } from 'express'
import { getTasks, createTask } from '../controllers/taskController.js'

const routerTask = express.Router()

routerTask.get('/', getTasks)

routerTask.post('/', createTask)

export default routerTask