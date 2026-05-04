import { X } from "lucide-react"

import FilterButton from "./FilterButton"
import SearchBar from "./SearchBar"
import CreateButton from "./CreateButton"
import DeleteButton from "./DeleteButton"

const TaskToolsBar = ({ isSelectedMode, onEnterSelectMode, onExitSelectMode }) => {
    return (
        <div className="flex items-center gap-3 mb-6">
            <FilterButton/>
            <SearchBar/>
            <CreateButton/>
            {isSelectedMode ? (
                <button className="
                p-2 bg-red-500
                border border-white/10 rounded-xl
                hover:bg-red-600 transition-all duration-300
                text-white/70 hover:text-white cursor-pointer
                active:scale-95
                "
                onClick={onExitSelectMode}
                aria-label="Botão para sair da seleção de Exclusão das Tarefas"
                >
                    <X size={18}/>
                </button>
            ) : (
                <DeleteButton onClick={onEnterSelectMode}/>
            )
            }
        </div>
    )
}

export default TaskToolsBar