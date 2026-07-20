import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { ArrowRight, Plus, Calendar, ListTodo, TrendingUp, AlertTriangle, Clock } from 'lucide-react'

import { Skeleton } from '../components/ui/Skeleton'
import { useAuthStore } from "../stores/useAuthStore"
import { useTaskStore } from "../stores/useTaskStore"

const Home = () => {
  const userName = useAuthStore(state => state.userName)
  const tasks = useTaskStore(state => state.tasks)
  const loadTask = useTaskStore(state => state.loadTask)
  const isLoading = useTaskStore(state => state.isLoading)

  useEffect(() => {
    if (tasks.length === 0) loadTask()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const pendentes = tasks.filter(t => !t.isCompleted).length
  const concluidas = tasks.filter(t => t.isCompleted).length
  const progresso = tasks.length > 0 ? Math.round((concluidas / tasks.length) * 100) : 0

  const urgentes = tasks
    .filter(t => !t.isCompleted && t.priority === 'alta')
    .slice(0, 3)

  const recentes = [...tasks]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3)

  const hora = new Date().getHours()
  const saudacao = hora < 12 ? 'Bom dia' : hora < 18 ? 'Boa tarde' : 'Boa noite'
  const emojiSaudacao = hora < 12 ? '☀️' : hora < 18 ? '🌤️' : '🌙'

  const priorityDot = (p) => {
    if (p === 'alta') return 'priority-dot-alta'
    if (p === 'media') return 'priority-dot-media'
    return 'priority-dot-baixa'
  }

  const cardBase = "bg-white/[0.07] border border-white/[0.08] rounded-3xl p-6 lg:p-7 hover:bg-white/[0.12] hover:border-white/[0.15] transition-all duration-300"

  const frases = [
    "Um passo de cada vez. Você está construindo algo incrível. 💪",
    "Organizar é o primeiro passo para realizar. ✨",
    "Hoje é um bom dia para começar. 🚀",
    "Foco no que importa. O resto a gente resolve depois. 🎯",
    "Você tem tempo. Respira e vai com calma. 🧘",
    "Pequenas ações diárias levam a grandes resultados. 🌱",
    "Não se cobre tanto. Você está indo bem. 💙",
  ]

  const [fraseDoDia] = useState(() => 
    frases[Math.floor(Math.random() * frases.length)]
  )

  if (isLoading && tasks.length === 0) {
    return (
      <div className='animate-fade-in space-y-5 lg:space-y-6'>
        <div className='flex items-center gap-4 mb-1'>
          <Skeleton className='w-12 h-12 rounded-full' />
            <Skeleton className='w-48 h-5 rounded' />
            <Skeleton className='w-32 h-4 rounded' />
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6'>
          <Skeleton className='lg:col-span-2 h-48 rounded-3xl'/>
          <Skeleton className='h-48 rounded-3xl' />
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in space-y-5 lg:space-y-6">
      
      <div className="flex items-center gap-4 mb-1">
        <div className="w-12 h-12 rounded-full bg-orange-500/20 border border-orange-400/30 
                        flex items-center justify-center flex-shrink-0">
          <span className="text-xl font-poppins font-semibold text-orange-400">
            {userName?.charAt(0)?.toUpperCase() || '?'}
          </span>
        </div>
        <div>
          <h1 className="text-2xl lg:text-3xl font-poppins font-bold text-white tracking-tight">
            {emojiSaudacao} {saudacao}, {userName?.split(' ')[0]}
          </h1>
          <p className="text-orange-200/50 text-sm mt-0.5">Pronto para organizar seu dia?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
        

        <div className={`lg:col-span-2 ${cardBase} flex flex-col justify-between`}>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white/[0.05] rounded-2xl p-4 text-center border border-white/[0.05]">
              <ListTodo size={20} className="text-orange-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{tasks.length}</p>
              <p className="text-xs text-orange-200/60 mt-1 uppercase tracking-wider font-medium">Total</p>
            </div>
            <div className="bg-white/[0.05] rounded-2xl p-4 text-center border border-white/[0.05]">
              <AlertTriangle size={20} className="text-red-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{pendentes}</p>
              <p className="text-xs text-orange-200/60 mt-1 uppercase tracking-wider font-medium">Pendentes</p>
            </div>
            <div className="bg-white/[0.05] rounded-2xl p-4 text-center border border-white/[0.05]">
              <TrendingUp size={20} className="text-green-400 mx-auto mb-2" />
              <p className="text-3xl font-bold text-white">{progresso}%</p>
              <p className="text-xs text-orange-200/60 mt-1 uppercase tracking-wider font-medium">Concluído</p>
            </div>
          </div>


          <div>
            <div className="flex justify-between text-sm text-orange-200/60 mb-2">
              <span>Progresso geral</span>
              <span>{concluidas} de {tasks.length} tarefas</span>
            </div>
            <div className="w-full h-4 bg-white/[0.08] rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400 
                           rounded-full transition-all duration-700 ease-out 
                           shadow-[0_0_10px_rgba(251,146,60,0.5)]"
                style={{ width: `${progresso}%` }}
              />
            </div>
          </div>
        </div>

        <div className={`${cardBase} flex flex-col justify-center`}>
          <p className="text-white/60 text-sm font-medium uppercase tracking-wider mb-5">
            Ações rápidas
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/create" 
              className="flex items-center justify-between bg-orange-500/10 hover:bg-orange-500/30 
                         border border-orange-400/30 rounded-2xl px-5 py-4 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-orange-500/20 flex items-center justify-center">
                  <Plus size={18} className="text-orange-300" />
                </div>
                <span className="text-white text-sm font-medium">Nova Tarefa</span>
              </div>
              <ArrowRight size={16} className="text-orange-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/tasks" 
              className="flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.1] 
                         border border-white/[0.08] rounded-2xl px-5 py-4 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center">
                  <ListTodo size={18} className="text-orange-300" />
                </div>
                <span className="text-white text-sm font-medium">Minhas Tarefas</span>
              </div>
              <ArrowRight size={16} className="text-white/30 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link to="/schedule" 
              className="flex items-center justify-between bg-white/[0.05] hover:bg-white/[0.1] 
                         border border-white/[0.08] rounded-2xl px-5 py-4 transition-all group">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-white/[0.08] flex items-center justify-center">
                  <Calendar size={18} className="text-orange-300" />
                </div>
                <span className="text-white text-sm font-medium">Agendamentos</span>
              </div>
              <ArrowRight size={16} className="text-white/30 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
        
        <div className={cardBase}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-600" />
            </div>
            <h2 className="text-white font-poppins font-semibold text-lg">Precisam de atenção</h2>
          </div>
          
          {urgentes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {urgentes.map(task => (
                <Link key={task._id} to="/tasks"
                  className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] 
                             border border-white/[0.08] rounded-xl px-4 py-3 transition-all">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${priorityDot(task.priority)}`} />
                  <span className="text-white text-sm truncate">{task.title}</span>
                  {task.category?.length > 0 && (
                    <span className="text-xs text-orange-200/50 bg-white/[0.05] px-2 py-0.5 rounded-full ml-auto flex-shrink-0">
                      {task.category[0]}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4 text-center">
              <p className="text-orange-200/40 text-sm">Nenhuma tarefa urgente! 🎉</p>
            </div>
          )}
        </div>

        <div className={cardBase}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center">
              <Clock size={16} className="text-amber-400" />
            </div>
            <h2 className="text-white font-poppins font-semibold text-lg">Criadas recentemente</h2>
          </div>
          
          {recentes.length > 0 ? (
            <div className="flex flex-col gap-2">
              {recentes.map(task => (
                <Link key={task._id} to="/tasks"
                  className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1] 
                             border border-white/[0.08] rounded-xl px-4 py-3 transition-all">
                  <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${priorityDot(task.priority)}`} />
                  <span className="text-white text-sm truncate">{task.title}</span>
                  {task.category?.length > 0 && (
                    <span className="text-xs text-orange-200/50 bg-white/[0.05] px-2 py-0.5 rounded-full ml-auto flex-shrink-0">
                      {task.category[0]}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-xl p-4 text-center">
              <p className="text-orange-200/40 text-sm">Nenhuma tarefa criada ainda</p>
            </div>
          )}
        </div>
        
      </div>
      <div className="mt-4 bg-white/[0.05] border border-white/[0.08] rounded-2xl p-5 text-center">
        <p className="text-orange-200/40 text-sm italic">"{fraseDoDia}"</p>
      </div>
    </div>
  )
}

export default Home