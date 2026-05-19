import { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Pencil, Trash2, ArrowRightLeft, Copy } from 'lucide-react'

const TaskMenu = ({ task, onEdit, onDelete, onChangePriority, onDuplicate }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [showSubMenuPriority, setShowSubMenuPriority] = useState(false)

    const buttonRef = useRef(null)
    const [dropdownStyle, setDropdownStyle] = useState({})

    const priorities = [
        { label: 'Alta', value: 'alta', color: 'text-red-600'},
        { label: 'Média', value: 'media', color: 'text-yellow-600'},
        { label: 'Baixa', value: 'baixa', color: 'text-emerald-300'},
    ]

    const handleToggle = () => {
    if (!isOpen && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        const dropdownHeight = 180
        
        const top = (rect.bottom + dropdownHeight > window.innerHeight)
        ? `${rect.top - dropdownHeight - 4}px`
        : `${rect.bottom + 4}px`
        
        setDropdownStyle({
        top,
        right: `${window.innerWidth - rect.right}px`,
        })
    }
    setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleScroll = () => {
            if (isOpen && buttonRef.current) {
                const rect = buttonRef.current.getBoundingClientRect()
                const dropdownHeight = 180

                const top = (rect.bottom + dropdownHeight > window.innerHeight)
                ? `${rect.top - dropdownHeight - 4}px`
                : `${rect.bottom + 4}px`

                setDropdownStyle({
                    top,
                    right: `${window.innerWidth - rect.right}px`,
                })
            }
        }

        window.addEventListener('scroll', handleScroll, true)
        return () => window.removeEventListener('scroll', handleScroll, true)
    }, [isOpen])

    return (
        <div className="relative">
            <button
            ref={buttonRef}
            onClick={handleToggle}
            className="p-1 rounded-lg text-white/30 relative z-50
                hover:text-white/70 hover:bg-white/10
                transition-all duration-200 cursor-pointer"
            aria-label="Menu para modificar tarefa.">
                <EllipsisVertical size={18} />
            </button>

            {isOpen && (
                <div
                    className="fixed inset-0 z-30"
                    onClick={() => { setIsOpen(false); setShowSubMenuPriority(false) }}
                />
            )}

            {isOpen && (
                <div 
                    className="fixed z-40 w-44
                        bg-gradient-to-br from-orange-950 to-amber-950
                        border border-white/20 rounded-xl p-1.5
                        shadow-2xl animate-fade-in"
                        style={dropdownStyle}> 
                    <button
                    onClick={() => { onEdit(task); setIsOpen(false) }}
                    className="w-full flex items-center gap-2.5
                        px-3 py-2 rounded-lg text-white/70 text-sm
                        hover:bg-white/10 hover:text-white
                        transition-all duration-200"
                    aria-label="Botão de editar tarefa.">
                        <Pencil size={14}/>
                        Editar
                    </button>

                    <button
                    onClick={() => { onDelete(task); setIsOpen(false) }}
                    className="w-full flex items-center rounded-lg
                        gap-2.5 px-3 py-2 text-white/70 text-sm
                        hover:bg-red-500/20 hover:text-red-400
                        transtion-all duration-200"
                    aria-label="Botão para deletar tarefa.">
                        <Trash2 size={14}/>
                        Deletar
                    </button>

                    <button
                onClick={() => setShowSubMenuPriority(!showSubMenuPriority)}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg
                            text-white/70 text-sm
                            hover:bg-white/10 hover:text-white
                            transition-all duration-200"
                aria-label="Botão para expandir opções de prioridade"
                >
                <ArrowRightLeft size={14} />
                Prioridade
                </button>

                {showSubMenuPriority && (
                <div className="pl-6 py-1 flex flex-col gap-0.5">
                    {priorities.map(p => (
                    <button
                        key={p.value}
                        onClick={() => { onChangePriority(task, p.value); setIsOpen(false) }}
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-lg
                                    text-sm transition-all duration-200
                                    ${task.priority === p.value
                                    ? `bg-white/10  ${p.color}`
                                    : 'text-white/50 hover:bg-white/10 hover:text-white'}
                                    `}
                    >
                        {task.priority === p.value ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-current" />
                        ) : (
                        <span className="w-1.5 h-1.5 rounded-full border border-current opacity-30" />
                        )}
                        {p.label}
                    </button>
                    ))}
                </div>
                )}

                <button
                onClick={() => { onDuplicate(task); setIsOpen(false) }}
                className="w-full flex items-center gap-2.5
                px-3 py-2 rounded-lg
                text-white/70 text-sm
                hover:bg-white/10 hover:text-white
                transition-all duration-200"
                aria-label="Botão para duplicar tarefa">
                    <Copy size={14}/>
                    Duplicar
                </button>
                </div>
            )}
        </div>
    )
}

export default TaskMenu