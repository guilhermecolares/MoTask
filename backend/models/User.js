import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Nome é obrigatório'],
        trim: true,
        maxlength: [50, 'Máximo de 50 caracteres.']
    },
    email: {
        type: String,
        required: [true, 'Email é obrigatório'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Email inválido']
    },
    password: {
        type: String,
        required: [true, 'Senha é obrigatória'],
        minlength: [6, 'Mínimo de 6 caracteres'],
        select: false
    }
}, { timestamps: true })

UserSchema.pre('save', async function() {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
})

UserSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

export default mongoose.model('User', UserSchema)