import Task from "../../models/Task.js"
import mongoose from "mongoose"


export const getTasks = async (req, res) => {
    try {
        const userId = req.user.id
        const tasks = await Task.find({ userId }).sort({ createdAt: -1})

        return res.status(200).json({ success: true, count: tasks.length, tasks})
    } catch (error) {
        return res.status(500).json({
            success: false, error: error.message})
    }
}

export const createTask = async (req, res) => {
    try {
        const userId = req.user.id
        const task = new Task({ ...req.body, userId })
        const savedTask = await task.save()

        return res.status(201).json({
          success: true, message: "Tarefa criada com sucesso!", task: savedTask
        })
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message })
    }
}

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ success: false, error: "Tarefa não encontrada!" })

    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, error: "Não autorizado!" })
    }

    const allowedUpdates = ['title', 'description', 'isCompleted', 'category', 'tags', 'priority', 'dueDate']
    const updates = {}
    allowedUpdates.forEach(campo => {
      if (req.body[campo] !== undefined) {
        updates[campo] = req.body[campo]
      }
    })

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updates,
      { returnDocument: 'after', runValidators: true }
    )

    return res.status(200).json({ success: true, task: updatedTask })
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message })
  }
}

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params
    const userId = req.user.id

    const task = await Task.findById(id)
    if (!task) return res.status(404).json({ success: false, error: "Tarefa não encontrada!" })

    if (task.userId.toString() !== userId.toString()) {
      return res.status(403).json({ success: false, error: "Não autorizado!" })
    }

    await Task.findByIdAndDelete(id)

    return res.status(200).json({ success: true, message: "Tarefa deletada com sucesso!"})
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message})
  }
}