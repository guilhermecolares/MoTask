import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Titulo Obrigatório!'],
        trim: true,
        maxlength: [50, 'Máximo de 50 caracteres!']
    },

    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Descrição longa demais!']
    },

    isCompleted: {
        type: Boolean,
        default: false
    },

    category: {
        type: String,
        enum: {
            values: ['trabalho', 'pessoal', 'estudo', 'outros'],
            message: 'Categoria deve ser trabalho, pessoal ou estudo.'
        }
    },

    tags: [{
        type: String,
        trim: true,
        maxlength: [15, 'Máximo de 15 caracteres por tag!']
    }],

    priority: {
        type: String,
        enum: ['baixa', 'media', 'alta'],
        default: 'media'
    }
})

export default mongoose.model('Task', TaskSchema)