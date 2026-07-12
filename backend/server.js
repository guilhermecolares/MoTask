import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import connectDB from './config/database.js'
import routerTask from './routes/tasks.js'
import authRoutes from './routes/auth.js'


const app = express()
const port = process.env.PORT || 5000

const allowedOrigins = [
    'https://mo-task.vercel.app',
    'http://localhost:5173',
    'http://localhost:3000'
]

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Bloqueado pelo CORS'))
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.get('/', (req, res) => {
    res.json({ message: 'MoTask API rodando! MongoDB Conectado!'})
})

app.use('/api/tasks', routerTask)
app.use('/api/auth', authRoutes)


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})