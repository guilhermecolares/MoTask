import axios from 'axios'

const API = axios.create({
    baseURL: 'http://localhost:5000/api',
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }

        return config
    }, (error) => Promise.reject(error)
)

export const fetchTask = () => API.get(`/tasks`)

export const createTask = (taskData) => API.post(`/tasks`, taskData)

export const updateTask = (id, taskData) => API.patch(`/tasks/${id}`, taskData)

export const deleteTask = (id) => API.delete(`/tasks/${id}`)

export default API