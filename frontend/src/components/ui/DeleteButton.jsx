import { Trash2 } from "lucide-react"

const DeleteButton = ({ onClick }) => {
  return (
    <button className="
    p-2 bg-white/5
    border border-white/10 rounded-xl
    hover:bg-white/10 transition-all duration-300
    text-white/70 hover:text-red-600 cursor-pointer
    "
    onClick={onClick}
    aria-label="Botão para selecionar a Exclusão de Tarefas"
    >
        <Trash2 size={18}/>
    </button>
  )
}

export default DeleteButton