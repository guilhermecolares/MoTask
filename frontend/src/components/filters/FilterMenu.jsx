import { useFilterStore } from "../../stores/useFilterStore";

import { ArrowUpDown, Filter, LayoutGrid, RotateCcw } from "lucide-react";

const FilterMenu = ({ isOpen, onClose }) => {
    const sortBy = useFilterStore(state => state.sortBy)
    const setSortBy = useFilterStore(state => state.setSortBy)
    const filterPriority = useFilterStore(state => state.filterPriority)
    const togglePriority = useFilterStore(state => state.togglePriority)
    const filterCategory = useFilterStore(state => state.filterCategory)
    const toggleCategory = useFilterStore(state => state.toggleCategory)
    const columns = useFilterStore(state => state.columns)
    const setColumns = useFilterStore(state => state.setColumns)
    const clearFilter = useFilterStore(state => state.clearFilter)

    const avaiableColumns = () => {
        const width = window.innerWidth

        if(width >= 1024) return [1, 2, 3]
        if(width >= 640) return [1, 2, 3]
        return [1]
    }

    if (!isOpen) return null

    return (
        <>
            <div 
                className="fixed inset-0 z-40"
                onClick={onClose}
            />

            <div className="
                absolute top-full left-0 mt-2 z-50
                bg-gradient-to-br from-orange-950 to-amber-950
                border border-white/20 rounded-2xl p-4 w-64
                shadow-2xl animate-fade-in
            ">
                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <ArrowUpDown size={14} className="text-orange-300"/>
                        <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                            Ordenar por
                        </span>
                    </div>

                    <div className="flex flex-col gap-1">
                        {[
                            { label: 'Mais recentes', value: 'recentes'},
                            { label: 'Mais antigos', value: 'antigos'},
                            { label: 'A-Z', value: 'a-z'},
                            { label: 'Z-A', value: 'z-a'},
                        ].map(item => (
                            <button key={item}
                            onClick={() => setSortBy(item.value)}
                            className={`
                                text-left px-3 py-1.5 rounded-lg text-sm
                                transtion-all duration-200
                                ${sortBy === item.value
                                    ? 'bg-white/10 text-white' 
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'}
                            `}>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 my-3"/>

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={14} className="text-orange-300"/>
                        <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                            Prioridade
                        </span>
                    </div>

                    <div className="flex gap-2">
                        {[
                            { label: 'Alta', value: 'alta', active: 'bg-red-500/20 text-red-400 border-red-500/30', inactive: 'bg-white/5 text-white/50 border-white/10'},
                            { label: 'Media', value: 'media', active: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', inactive: 'bg-white/5 text-white/50 border-white/10'},
                            { label: 'Baixa', value: 'baixa', active: 'bg-green-500/40 text-green-400 border-green-500/30', inactive: 'bg-white/5 text-white/50 border-white/10'},
                        ].map(item => (
                            <button key={item.value} 
                            onClick={() => togglePriority(item.value)}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs font-medium border
                                hover:bg-white/10 hover:text-white/80 active:scale-95
                                transition-all duration-200
                                ${filterPriority.includes(item.value)
                                    ? item.active
                                    : item.inactive
                                }
                            `}>
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-white/10 my-3"/>

                <div className="mb-4">
                    <div className="flex items-center gap-2 mb-2">
                        <Filter size={14} className="text-orange-300"/>
                        <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                            Categoria
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                        {[
                            { label: 'Trabalho', value: 'trabalho', active: 'bg-blue-500/20 text-blue-400 border-blue-500/30', inactive: 'bg-white/5 text-white/50 border-white/10' },
                            { label: 'Estudo', value: 'estudo', active: 'bg-purple-500/20 text-purple-400 border-purple-500/30', inactive: 'bg-white/5 text-white/50 border-white/10' },
                            { label: 'Pessoal', value: 'pessoal', active: 'bg-pink-500/20 text-pink-400 border-pink-500/30', inactive: 'bg-white/5 text-white/50 border-white/10' },
                            { label: 'Outros', value: 'outros', active: 'bg-gray-500/40 text-gray-400 border-gray-500/30', inactive: 'bg-white/5 text-white/50 border-white/10' },
                        ].map(item => (
                            <button key={item.value} 
                            onClick={() => toggleCategory(item.value)}
                            className={`
                                px-3 py-1.5 rounded-lg text-xs font-medium border
                                hover:bg-white/10 hover:text-white/80 active:scale-95
                                transition-all duration-200
                                ${filterCategory.includes(item.value)
                                    ? item.active
                                    : item.inactive
                                }
                            `}>
                                📂 {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {avaiableColumns().length > 1 && (
                    <>
                        <div className="border-t border-white/10 my-3"/>

                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2">
                                <LayoutGrid size={14} className="text-orange-300"/>
                                <span className="text-white/70 text-xs font-medium uppercase tracking-wider">
                                    Layout
                                </span>
                            </div>

                            <div className="flex gap-2">
                                    {avaiableColumns().map(col => (
                                        <button key={col} 
                                        onClick={() => setColumns(col)}
                                        className={`
                                            w-10 h-10 rounded-lg text-sm
                                            transition-all duration-200
                                            ${columns === col
                                                ? `bg-white/20 text-white`
                                                : `bg-white/5 text-white/70 hover:bg-white/10 hover:text-white`
                                            }
                                        `}>
                                            {col}
                                        </button>
                                    ))}
                                </div>
                        </div>
                    </>
                )}

                <div className="border-t border-white/10 my-3"/>

                <button 
                onClick={() => clearFilter()}
                className="
                    w-full flex items-center justify-center gap-2
                    px-3 py-2 rounded-lg text-white/50 text-xs
                    hover:bg-white/5 hover:text-white/70 active:scale-95
                    transition-all duration-200 uppercase
                ">
                    <RotateCcw size={12}/>
                    <span>Limpar Filtros</span>
                </button>
            </div>
        </>
    )
}

export default FilterMenu