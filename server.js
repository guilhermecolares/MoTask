import express from 'express'
import connectDB from './config/database.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 5000

connectDB()

app.get('/', (req, res) => {
    res.json({ message: 'MoTask API rodando! MongoDB Conectado!'})
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
})