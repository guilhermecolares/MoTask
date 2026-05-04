import { useEffect, useState } from "react"
import { fetchTask, updateTask, deleteTask } from "../api/tasks"

import TaskCard from "../components/TaskCard"

import TaskToolsBar from "../components/ui/TaskToolsBar"
import SelectionFABS from "../components/ui/SelectionFABS"

const Tasks = () => {
  const [tasks, setTasks] = useState([])

  const [selectMode, setSelectMode] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState([])

  useEffect(() => {
    const connectionTest = async () => {
      //localStorage.setItem('mockUserId', '69ea4386424590ccb84ddc88')

      console.log('Buscando Tarefas do MongoDB...')

      try {
        const response = await fetchTask()

        setTasks(response.data.tasks)
        console.log('Resposta do BackEnd:', response.data.tasks)
      } catch (error) {
        console.error('Erro na Request:', error.message)
      }
    }

    connectionTest()
  }, [])

  const handleToggleCheck = async (taskId, currentStatus) => {
    try {
      await updateTask(taskId, {isCompleted: !currentStatus})

      setTasks(oldTask => oldTask.map(task =>
        task._id === taskId 
        ? { ...task, isCompleted: !currentStatus }
        : task
      ))
    } catch (error) {
      console.error(`Erro ao atualizar tarefa: ${error}`)
    }
  }

  const handleEnterSelectMode = () => {
    setSelectMode(true)
    setSelectedTasks([])
  }

  const handleExitSelectMode = () => {
    setSelectMode(false)
    setSelectedTasks([])
  }

  const handleToggleSelectedTasks = (taskId) => {
    setSelectedTasks(current => 
      current.includes(taskId)
        ? current.filter(id => id !== taskId)
        : [...current, taskId]
    )
  }

  const handleDeleteSelected = async () => {
    try {
      for (const taskId of selectedTasks) {
        await deleteTask(taskId)
      }
    

    setTasks(current => current.filter(task => !selectedTasks.includes(task._id)))

    handleExitSelectMode()
    } catch (error) {
      console.error('Erro ao deletar:', error)
    }
  }

  return (
    <div className="text-white text-3xl">

      <TaskToolsBar
        isSelectedMode={selectMode}
        onEnterSelectMode={handleEnterSelectMode}
        onExitSelectMode={handleExitSelectMode}
      />

      {tasks.length === 0 ? (
          <p className="text-sm text-orange-200/70 mt-2">
          Nenhuma tarefas encontrada!
        </p>
      ) : (
      <div className="flex flex-col gap-3 mt-6">
        {tasks.map(task => (
          <TaskCard 
          key={task._id}
          task={task}
          onToggle={handleToggleCheck}
          isSelectedMode={selectMode}
          isChecked={selectedTasks.includes(task._id)}
          onToggleSelect={handleToggleSelectedTasks}
          />
        ))}
      </div>
      )
    }

    {selectMode && (
      <SelectionFABS
      selectedCount={selectedTasks.length}
      onReset={handleExitSelectMode}
      onDelete={handleDeleteSelected}
      />
    )}
    </div>
  )
}

export default Tasks