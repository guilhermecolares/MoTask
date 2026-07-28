import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ChevronLeft, ChevronRight } from "lucide-react"

import Breadcrumb from "../components/ui/Breadcrumb"
import { Skeleton } from "../components/ui/Skeleton.jsx"
import { useTaskStore } from "../stores/useTaskStore.js"

const Schedule = () => {
  const tasks = useTaskStore(state => state.tasks)
  const loadTask = useTaskStore(state => state.loadTask)
  const isLoading = useTaskStore(state => state.isLoading)

  useEffect(() => {
    if (tasks.length === 0) loadTask()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const [selectedDay, setSelectedDay] = useState(null)

  const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ]

  const daysOfWeek = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB']
  
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()

  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const goToToday = () => {
    setCurrentMonth(today.getMonth())
    setCurrentYear(today.getFullYear())
  }

  const isToday = (day) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
  }

  const days = []

  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i)
  }

  const tasksByDay = {}

  tasks.forEach(task => {
    if (task?.dueDate && !task.isCompleted) {
      const taskDate = new Date(task.dueDate)

      if (taskDate.getMonth() === currentMonth && taskDate.getFullYear() === currentYear) {
        const day = taskDate.getDate()
        if (!tasksByDay[day]) tasksByDay[day] = []
        tasksByDay[day].push(task)
      }
    }
  })

  const isOverdue = (day) => {
    if (!tasksByDay[day]) return false

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const dayDate = new Date(currentYear, currentMonth, day)

    return dayDate < today && tasksByDay[day].some(task => !task.isCompleted)
  }

  return (
    <div className="space-y-6">
      <Breadcrumb to="/" label="Início" />

      {isLoading && tasks.length === 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Skeleton className="w-48 h-8 rounded" />
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-lg" />
              <Skeleton className="w-14 h-8 rounded-lg" />
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
            <Skeleton className="lg:col-span-2 h-96 rounded-2xl" />
            <Skeleton className="h-96 rounded-2xl" />
          </div>
        </div>
      )}
      
      {!isLoading && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-poppins font-semibold text-white">
              📅 {months[currentMonth]} {currentYear}
            </h2>
            <div className="flex items-center gap-2">
              <button
              onClick={prevMonth}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10
              text-white/60 hover:text-white active:scale-95 transition-all">
                <ChevronLeft size={18} />
              </button>
              <button
              onClick={goToToday}
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10
              text-white/60 hover:text-white active:scale-95 text-sm transition-all uppercase tracking-tighter">
                Hoje
              </button>
              <button
              onClick={nextMonth}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10
              text-white/60 hover:text-white active:scale-95 transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6">
          
            <div className="lg:col-span-2 bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 lg:p-6">
              <div className="grid grid-cols-7 mb-3">
                {daysOfWeek.map(day => (
                  <div key={day} className="text-center text-white/40 text-xs font-medium uppercase tracking-wider py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {days.map((day, index) => (
                  <div
                  key={index}
                  className={`
                  aspect-square flex items-center justify-center rounded-xl text-sm transition-all
                  ${day === null
                    ? 'text-transparent'
                    : isToday(day)
                      ? 'bg-orange-500/20 text-white font-semibold'
                      : day === selectedDay
                      ? 'bg-white/10 text-white font-medium ring-1 ring-orange-400/50'
                      : 'text-white/60 hover:bg-white/10 cursor-pointer'
                  }`}>
                    {day && (
                        <button
                        onClick={() => setSelectedDay(day)}
                        className="relative flex items-center justify-center w-full h-full">
                          <span>{day}</span>
                          {tasksByDay[day] && tasksByDay[day].length > 0 && (
                            <span className={`
                              absolute top-1 right-1 w-4 h-4 rounded-full
                              text-[10px] text-white font-semibold flex-items justify-center
                              ${isOverdue(day) ? 'bg-red-500' : 'bg-orange-500'}`}>
                              {tasksByDay[day].length}
                            </span>
                          )}
                        </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-2xl p-4 lg:p-6">
              {selectedDay && tasksByDay[selectedDay] ? (
                <>
                  {tasksByDay[selectedDay].length > 1 ? (
                    <h3 className="text-white font-poppins font-semibold text-lg mb-4">
                      📋 Dia {selectedDay} — {tasksByDay[selectedDay].length} tarefas
                    </h3>
                  ) : <h3 className="text-white font-poppins font-semibold text-lg mb-4">
                      📋 Dia {selectedDay} — {tasksByDay[selectedDay].length} tarefa
                    </h3>}
                  <div className="flex flex-col gap-2">
                    {tasksByDay[selectedDay].map(task => (
                      <Link
                      key={task._id}
                      to="/tasks"
                      className="flex items-center gap-3 bg-white/[0.05] hover:bg-white/[0.1]
                                border border-white/[0.08] rounded-xl px-4 py-3 transition-all cursor-pointer">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                          task.priority === 'alta' ? 'bg-red-500' :
                          task.priority === 'media' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`} />
                        <span className="text-white text-sm truncate">{task.title}</span>
                        {task.category?.length > 0 && (
                          <span className="text-xs text-orange-200/50 bg-white/[0.05] px-2 py-0.5 rounded-full ml-auto flex-shrink-0">
                            {task.category[0]}
                          </span>
                        )}
                      </Link>
                    ))}
                  </div>
                </>
              ) : selectedDay ? (
                <div className="flex items-center justify-center h-full">
                  <p className="text-orange-200/40 text-sm">Nenhuma tarefa para este dia ✨</p>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-orange-200/40 text-sm text-center">Selecione um dia para ver as tarefas 📅</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Schedule