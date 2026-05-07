import { useEffect, useState } from "react"

import { useTaskStore } from "../stores/useTaskStore"

import TaskCard from "../components/TaskCard"

import TaskToolsBar from "../components/ui/TaskToolsBar"
import SelectionFABS from "../components/ui/SelectionFABS"
import ConfirmModal from "../components/ui/ConfirmModal"

const Tasks = () => {
  const [selectMode, setSelectMode] = useState(false)
  const [selectedTasks, setSelectedTasks] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [showConfirmModal, setShowConfirmModal] = useState(false)

  const tasks = useTaskStore(state => state.tasks)
  const loadTask = useTaskStore(state => state.loadTask)
  const toggleComplete = useTaskStore(state => state.toggleComplete)
  const deleteTasks = useTaskStore(state => state.deleteTasks)

  useEffect(() => {
      localStorage.setItem('mockUserId', '69fb655f249a788584fc1ea3')

      loadTask()
  }, [loadTask])

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
    if (selectedTasks.length === 0) return
    setShowConfirmModal(true)
  }

  const confirmDelete = async () => {
    await deleteTasks(selectedTasks)
    setShowConfirmModal(false)
    handleExitSelectMode()
  }

  const cancelDelete = async () => setShowConfirmModal(false)

  const searchLower = searchTerm.toLowerCase()

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchLower)
  )

  return (
    <div className="text-white text-3xl">

      <TaskToolsBar
        isSelectedMode={selectMode}
        searchValue={searchTerm}
        searchOnChange={(e) => setSearchTerm(e.target.value)}
        onEnterSelectMode={handleEnterSelectMode}
        onExitSelectMode={handleExitSelectMode}
      />

      {filteredTasks.length === 0 ? (
          <p className="text-sm text-orange-200/70 mt-2">
          Nenhuma tarefas encontrada!
        </p>
      ) : (
      <div className="flex flex-col gap-3 mt-6">
        {filteredTasks.map(task => (
          <TaskCard 
          key={task._id}
          task={task}
          onToggle={toggleComplete}
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

    <ConfirmModal 
    isOpen={showConfirmModal}
    onConfirm={confirmDelete}
    onCancel={cancelDelete}
    count={selectedTasks.length}
    />

    </div>
  )
}

export default Tasks