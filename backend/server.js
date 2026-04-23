import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import connectDB from './config/database.js'
import routerTask from './routes/tasks.js'


const app = express()
const port = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

connectDB()

app.get('/', (req, res) => {
    res.json({ message: 'MoTask API rodando! MongoDB Conectado!'})
})

app.use('/api/tasks', routerTask)



app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})