import { create } from 'zustand'
import { fetchTask, createTask, updateTask, deleteTask } from '../api/tasks.js'

export const useTaskStore = create((set, get) => ({
    tasks: [],
    isLoading: false,
    error: null,

    loadTask: async () => {
        set({ isLoading: true, error: null})
        try {
            const response = await fetchTask()
            set({ tasks: response.data.tasks, isLoading: false })
        } catch (error) {
            set({ error: error.message, isLoading: false })
        }
    },

    toggleComplete: async (taskId, currentStatus) => {
        try {
            await updateTask(taskId, {isCompleted: !currentStatus})
            set((state) => ({
                tasks: state.tasks.map(task =>
                task._id === taskId
                ? { ...task, isCompleted: !currentStatus}
                : task
                )
            }))
        } catch (error) {
            console.error(`Erro ao atualizar ${error}`)
        }
    },

    deleteTasks: async (taskIds) => {
        try {
            for (const id of taskIds) await deleteTask(id)
            
            set((state) => ({
                tasks: state.tasks.filter(task => !taskIds.includes(task._id))
            }))
        } catch (error) {
            console.error(`Erro ao tentar deletar ${error}`)
        }
    }
}))