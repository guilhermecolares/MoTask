import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

const generateToken = (userId, userName) => {
    return jwt.sign(
        { userId, name: userName },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )
}

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ sucess: false, error: 'Email ja cadastrado.' })
        }

        const user = await User.create({ name, email, password })
        const token = generateToken(user._id, user.name)

        res.status(201).json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(400).json({ success: false, error: error.message })
    }
})

router.post('/login', async(req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email }).select('+password')
        if (!user) {
            return res.status(401).json({ success: false, error: 'Email ou senha inválidos.' })
        }

        const isMatch = await user.comparePassword(password)
        if (!isMatch) {
            return res.status(401).json({ sucess: false, error: 'Email ou senha inválidos.' })
        }

        const token = generateToken(user._id, user.name)

        res.json({
            success: true,
            token,
            user: { id: user._id, name: user.name, email: user.email }
        })
    } catch (error) {
        res.status(400).json({ sucess: false, error: error.message})
    }
})

export default router