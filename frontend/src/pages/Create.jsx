import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { Save, ArrowLeft, Plus, RotateCcw, X } from "lucide-react"
import { useTaskStore } from '../stores/useTaskStore'
import Breadcrumb from "../components/ui/Breadcrumb"

const Create = () => {
  const navigate = useNavigate()
  const createTask = useTaskStore(state => state.createTaskAction)
  const loadTask = useTaskStore(state => state.loadTask)
  const tasks = useTaskStore(state => state.tasks)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState('media')
  const [selectedCategories, setSelectedCategories] = useState([])
  const [tags, setTags] = useState([])
  const [tagInput, setTagInput] = useState('')
  const [dueDate, setDueDate] = useState('')

  const priorities = [
    { label: 'Alta', value: 'alta' },
    { label: 'Média', value: 'media' },
    { label: 'Baixa', value: 'baixa' },
  ]

  const categories = [
    { label: 'Trabalho', value: 'trabalho' },
    { label: 'Estudo', value: 'estudo' },
    { label: 'Pessoal', value: 'pessoal' },
    { label: 'Outros', value: 'outros'}
  ]

  useEffect(() => {
    loadTask()
  }, [loadTask])

  const addTag = () => {
    const trimmed = tagInput.trim().toLowerCase()
    if (trimmed && !tags.includes(trimmed) && tags.length < 5) {
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title.trim()) return

    console.log('Enviando:', { title, description, priority, category: selectedCategories, tags, dueDate })

    await createTask({
      title, 
      description,
      priority,
      category: selectedCategories,
      tags,
      dueDate: dueDate || null
    })

    navigate('/tasks')
  }

  const handleReset = () => {
    setTitle('')
    setDescription('')
    setPriority('media')
    setSelectedCategories([])
    setTags([])
    setTagInput('')
    setDueDate('')
  }

  const isDirty = title.trim() || description.trim() || priority !== 'media' || selectedCategories.length > 0 || tags.length > 0

  const isValid = title.trim().length > 0
  
  const recentTasks = tasks.slice(0, 3)

  return (
    <div className="text-white max-w-lg mx-auto">
      <Breadcrumb/>

      <h1 className="text-3xl font-poppins font-semibold mb-8 flex items-center gap-3">
        <span className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
          <Plus size={18}/>
        </span>
        Nova Tarefa
      </h1>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-white/60 text-sm mb-1.5 uppercase tracking-wider">
              Título
            </label>
            <input 
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Qual sua tarefa?"
            className="
            w-full bg-white/5 border border-white/10 rounded-xl shadow-md
            px-4 py-2.5 text-sm placeholder:text-white/20 outline-none
            focus:border-white/30 transition-all
            "
            aria-label="Campo de texto do título da sua tarefa."
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
          placeholder="Detalhes da tarefa..."
          className="
          w-full bg-white/5 border border-white/10 rounded-xl shadow-md
          px-4 py-2.5 text-sm placeholder:text-white/20 outline-none
          focus:border-white/30 transition-all resize-none
          "
          aria-label="Campo de texto da descrição da sua tarefa."
          />
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
              className={`w-20 px-3 py-1.5 rounded-lg text-sm font-medium border shadow-md active:scale-95
                ${priority === p.value
                  ? p.value === 'alta' ? 'bg-red-500/20  border-red-500/30' :
                    p.value === 'media' ? 'bg-yellow-500/20  border-yellow-500/30' :
                    'bg-green-500/20  border-green-500/30'
                  : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
                }`}
              aria-label={`Botão de prioridade ${p.label}`}
              >
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
              onClick={() => setSelectedCategories(prev =>
                prev.includes(c.value)
                ? prev.filter(cat => cat !== c.value)
                : [...prev, c.value]
              )}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition shadow-md active:scale-95
              ${selectedCategories.includes(c.value)
                ? 'bg-blue-500/20 border-blue-500/30'
                : 'bg-white/5 text-white/50 border-white/10 hover:bg-white/10'
              }`}>
                📂 {c.label}
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
                className="
                inline-flex items-center gap-1 px-2 py-0.5
                rounded-full text-xs bg-white/10 text-orange-200">
                  #{tag}
                  <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="text-white/40 hover:text-white/80 transition-colors">
                    <X size={12}/>
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
            className="
            flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5
            text-white text-sm placeholder:text-white/20 outline-none
            focus:border-white/30 transition-all"
            />

            <button
            type="button"
            onClick={addTag}
            disabled={!tagInput.trim() || tags.length >= 5}
            className="
            px-3 py-1.5 rounded-xl bg-white/10 text-white/70 text-sm
            hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed
            transition-all
            ">
              +
            </button>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <button
          type="submit"
          disabled={!isValid}
          className={`px-5 py-2.5 rounded-xl font-poppins font-medium text-sm transition-all flex items-center gap-2 active:scale-95
            ${isValid
              ? 'bg-orange-500/80 text-white hover:bg-orange-500'
              : 'bg-white/5 text-white/30 cursor-not-allowed'
            }`}>
              <Save size={16}/>
              Criar Tarefa
          </button>

          <button
          type="button"
          onClick={handleReset}
          disabled={!isDirty}
          className={`px-5 py-2.5 rounded-xl font-poppins text-sm font-medium transition-all flex items-center gap-2 active:scale-95
            ${isDirty
              ? 'bg-white/10 text-white/80 hover:bg-white/20'
              : 'bg-white/5 text-white/20 cursor-not-allowed'
            }`}
          >
            <RotateCcw size={16}/>
            Limpar
          </button>
        </div>
        </form>

        {recentTasks.length > 0 && (
          <div className="mt-6 pt-6 border-t border-white/10">
            <h3 className="text-white/60 text-sm font-medium uppercase tracking-wider mb-3">
              Tarefas recentes
            </h3>

            <div className="grid gap-1 grid-cols-1">
              {recentTasks.map(task => (
                <button
                key={task._id}
                onClick={() => navigate('/tasks')}
                className="
                flex items-start gap-2 bg-white/5 hover:bg-white/10
                rounded-xl p-3 text-left transition-all cursor-pointer">
                  <div className={`w-1 h-10 rounded-full flex-shrink-0 ${
                    task.priority === 'alta' ? 'bg-red-600':
                    task.priority === 'media' ? 'bg-yellow-600' :
                    'bg-emerald-300'
                  }`}/>

                  <div className="min-w-0 flex-1">
                    <p className="text-white text-sm font-medium truncate mb-1">
                      {task.title}
                    </p>

                    {task.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags.slice(0, 5).map(tag => (
                          <span key={tag} className="text-xs bg-white/5 rounded-xl px-2 py-0.5 text-orange-200/50">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {task.category?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.category.map(cat => (
                          <span key={cat} className="text-xs text-white/30 bg-white/5 rounded-xl px-2 py-0.5">
                            📂{cat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

          </div>
        )}
      </div>
    </div>
  )
}

export default Create
