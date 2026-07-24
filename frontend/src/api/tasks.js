import axios from 'axios'

const API = axios.create({
    baseURL: 'https://motask-api.onrender.com/api',
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

API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token')
            localStorage.removeItem('motask-auth')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export const fetchTask = () => API.get(`/tasks`)

export const createTask = (taskData) => API.post(`/tasks`, taskData)

export const updateTask = (id, taskData) => API.patch(`/tasks/${id}`, taskData)

export const deleteTask = (id) => API.delete(`/tasks/${id}`)

export default API