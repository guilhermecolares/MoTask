import { Plus } from "lucide-react"

const CreateButton = () => {
  return (
    <button className="
    flex items-center gap-1.5
    bg-orange-500/20 px-3 py-2
    text-orange-100 text-sm font-medium 
    border border-orange-400/30 rounded-xl
    hover:bg-orange-500/30 hover:scale-105 active:scale-95
    transition-all duration-300 cursor-pointer select-none
    "
    aria-label="Botão para criar nova tarefa">
        <Plus size={18}/>
        <span className="font-poppins">Criar</span>
    </button>
  )
}

export default CreateButton