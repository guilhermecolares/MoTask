import Task from "../models/Task.js"

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1})
        res.json({ success: true, count: tasks.length, tasks})
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        })
    }
}

export const createTask = async (req, res) => {
    try {
        const task = new Task(req.body)
        const savedTask = await task.save()
        res.status(201).json({
            success: true,
            message: "Tafeta criada com sucesso!",
            task: savedTask
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        })
    }
}