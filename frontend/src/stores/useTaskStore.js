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
    },

    changePriority: async (taskId, priority) => {
        try {
            await updateTask(taskId, {priority})
            set((state) => ({
                tasks: state.tasks.map(task =>
                    task._id === taskId ? { ...task, priority} : task
                )
            }))
        } catch (error) {
            console.error(`Erro na tentativa de mudar prioridade: ${error}`)
        }
    },

    duplicateTask: async (task) => {
        try {
            const { _id, createdAt, updatedAt, ...taskData } = task

            const tasks = get().tasks
            const baseTitle = taskData.title.replace(/\s*\(\d+\)$/, '').trim()

            const sameName = tasks.filter(t => {
                const tBase = t.title.replace(/\s*\(\d+\)$/, '').trim()

                return tBase === baseTitle
            }).length

            const response = await createTask({
                ...taskData, title: `${baseTitle} (${sameName + 1})`
            })
            set((state) => ({
                tasks: [response.data.task, ...state.tasks]
            }))
        } catch (error) {
            console.error(`Erro ao duplicar:`, error)
        }
    }
}))