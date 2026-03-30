import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Conectado ao MongoDB!")
    } catch (error) {
        console.error("Erro ao conectar o MongoDB!", error)
        process.exit(1)
    }
}

export default connectDB