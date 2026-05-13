import { useEffect, useState } from "react"

import { useTaskStore } from "../stores/useTaskStore"
import { useFilterStore } from "../stores/useFilterStore"

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

  const columns = useFilterStore(state => state.columns)
  const sortBy = useFilterStore(state => state.sortBy)
  const filterPriority = useFilterStore(state => state.filterPriority)
  const filterCategory = useFilterStore(state => state.filterCategory)

  useEffect(() => {
      localStorage.setItem('mockUserId', '6a0497b40ef6cdcadf0e05fd')

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
  ).filter(task => 
    filterPriority.length === 0 || filterPriority.includes(task.priority)
  ).filter(task =>
    filterCategory.length === 0 || filterCategory.includes(task.category)
  ).sort((a, b) => {
    switch (sortBy) {
      case 'recentes':
        return new Date(b.createdAt) - new Date(a.createdAt)
      case 'antigos':
        return new Date(a.createdAt) - new Date(b.createdAt)
      case 'a-z':
        return a.title.localeCompare(b.title)
      case 'z-a':
        return b.title.localeCompare(a.title)
      default:
        return 0
    }
  })

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
      <div className={`grid gap-3 mt-6 ${
        columns === 1 ? 'grid-cols-1' :
        columns === 2 ? 'grid-cols-1 sm:grid-cols-2' :
        'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
      }`}>
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