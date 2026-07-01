import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '')

        if (!token) {
            return res.status(401).json({ success: false, error: 'Acesso negado. Token não fornecido.' })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded.userId)
        if (!user) {
            return res.status(401).json({ success: false, error: 'Usuário não encontrado!'})
        }

        req.user = { id: user._id, name: user.name }

        next()
    } catch (error) {
        res.status(401).json({ success: false, error: 'Token inválido ou expirado.' })
    }
}

export default auth