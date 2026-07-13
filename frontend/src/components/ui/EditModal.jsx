import { useState} from "react"
import { X, Save} from "lucide-react"

const EditModal = ({ task, isOpen, onSave, onCancel }) => {
    const [title, setTitle] = useState(task ? task.title : '')
    const [description, setDescription] = useState(task ? task.description : '')

    const priorities = [
        { label: 'Alta', value: 'alta'},
        { label: 'Média', value: 'media'},
        { label: 'Baixa', value: 'baixa'},
    ]

    const [priority, setPriority] = useState(task ? task.priority : 'media')

    const [dueDate, setDueDate] = useState(task?.dueDate ? task.dueDate.split('T')[0] : '')

    const categories = [
        { label: 'Trabalho', value: 'trabalho'},
        { label: 'Estudo', value: 'estudo'},
        { label: 'Pessoal', value: 'pessoal'},
        { label: 'Outros', value: 'outros'},
    ]

    const [selectedCategories, setSelectedCategories] = useState(task ?task.category : [])

    const [tags, setTags] = useState(task ? task.tags : [])
    const [tagInput, setTagInput] = useState('')

    const toggleCategory = (categ) => {
        setSelectedCategories(prev =>
            prev.includes(categ) ? prev.filter(cat => cat !== categ) : [...prev, categ]
        )
    }

    const addTag = () => {
        const trimmed = tagInput.trim().toLowerCase()
        if (trimmed && !tags.includes(trimmed) && tags.length < 6) {
            setTags([...tags, trimmed])
            setTagInput('')
        }
    }

    const removeTag = (tag) => {
        setTags(tags.filter(t => t !== tag))
    }

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            addTag()
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        onSave({
            title,
            description,
            priority,
            category: selectedCategories,
            tags,
            dueDate: dueDate || null
        })
    }

    if (!isOpen || !task) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div
            onClick={onCancel}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        <div className="
        relative bg-gradient-to-br from-orange-950 to-amber-950
        border border-white/20 rounded-2xl p-6 max-w-lg w-full mx-4
        shadow-2xl animate-fade-in z-10 max-h-[90vh] overflow-y-auto
        ">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-poppins font-semibold text-xl">Editar Tarefa</h2>
                <button
                    onClick={onCancel}
                    className="text-white/40 hover:text-white transition-colors"
                >
                    <X size={20}/>
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Título
                    </label>
                    <input 
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/5 border border-white/10
                    rounded-xl px-4 py-2.5 text-white text-sm outline-none
                    focus:border-white/30 transition-all"                   
                    />
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Descrição
                    </label>
                    <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl
                    px-4 py-2.5 text-white text-sm outline-none
                    focus:border-white/30 transition-all resize-none"/>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Prioridade
                    </label>
                    <div className="flex gap-2">
                        {priorities.map(p => (
                            <button
                            key={p.value}
                            type="button"
                            onClick={() => setPriority(p.value)}
                            className={`w-20 px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                                ${priority === p.value
                                    ? p.value === 'alta' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                                    p.value === 'media' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' :
                                    'bg-green-500/20 text-green-400 border-green-500/30'
                                    : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                                }`}>
                                    {p.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Data de Entrega
                    </label>
                    <input 
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="
                    w-full bg-white/5 border border-white/10 rounded-xl
                    px-4 py-2.5 text-white text-sm outline-none
                    focus:border-white/30 transition-all
                    "
                    />
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Categoria
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {categories.map(c => (
                            <button
                            key={c.value}
                            type="button"
                            onClick={() => toggleCategory(c.value)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all
                            ${selectedCategories.includes(c.value)
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                                : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                            }`}>
                                📂{c.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
                        Tags
                    </label>

                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                        {tags.map(tag => (
                            <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5
                                        rounded-full text-xs bg-white/10 text-orange-200"
                            >
                            #{tag}
                            <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="text-white/40 hover:text-white/80 transition-colors"
                            >
                                <X size={12} />
                            </button>
                            </span>
                        ))}
                        </div>
                    )}

                    <div className="flex gap-2">
                        <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleTagKeyDown}
                        placeholder="Adicionar tag..."
                        maxLength={15}
                        className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5
                                    text-white text-sm placeholder:text-white/20 outline-none
                                    focus:border-white/30 transition-all"
                        />
                        <button
                        type="button"
                        onClick={addTag}
                        disabled={!tagInput.trim() || tags.length >= 5}
                        className="px-3 py-1.5 rounded-xl bg-white/10 text-white/70 text-sm
                                    hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
                                    transition-all"
                        >
                        +
                        </button>
                    </div>
                    </div>

                <div className="flex gap-3 justify-end pt-4 border-t border-white/10">
                    <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 rounded-xl bg-white/10 text-white/80
                    font-poppins text-sm font-medium
                    hover:bg-white/20 active:scale-95 transition-all">
                        Cancelar
                    </button>

                    <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-orange-500/80 text-white
                    font-poppins text-sm font-medium
                    hover:bg-orange-500 active:scale-95 transition-all
                    flex items-center gap-2">
                        <Save size={16}/>
                        Salvar
                    </button>
                </div>
            </form>    
        </div>
    </div>
  )
}

export default EditModal