import React from 'react'
import { Check } from 'lucide-react'

import TaskMenu from './TaskMenu'

const TaskCard = ({ task, onToggle, isSelectedMode, isChecked, onToggleSelect, onSingleDelete, onChangePriority, onDuplicateTask, onEdit }) => {
    const priorityColors = {
        alta: 'bg-red-600',
        moderada: 'bg-yellow-600',
        baixa: 'bg-emerald-300'
    }

  return (
    <div className='
    bg-white/10 rounded-2xl flex items-stretch overflow-hidden 
    hover:bg-white/15 transition-all duration-300
    border border-white/0 hover:border-white/20 hover:shadow-sm
    '>

        {isSelectedMode && (
            <button 
            className='flex items-center px-3 flex-shrink-0 cursor-pointer'
            onClick={() => onToggleSelect(task._id)}
            >
                <div className={`
                    w-5 h-5 rounded-full border-2 transition-all
                    flex items-center justify-center
                    ${isChecked
                        ? `bg-orange-400 border-orange-400`
                        : `border-white/30 hover:border-white/60`
                    }
                    `}>
                        {isChecked && <Check size={12} strokeWidth={3} className='text-white'/>}
                </div>

            </button>
        )}

        <div className={`w-1 flex-shrink-0 ${priorityColors[task.priority] || `bg-yellow-500`}`}/>

            <div className='flex-1 p-4 min-w-0'>

                <h3 className={`font-poppins font-semibold text-white text-lg
                    ${task.isCompleted ? `line-through text-white/50` : ''}`}>
                    {task.title}
                </h3>

                {task.description && (
                    <p className='text-orange-200/70 text-sm mt-1 line-clamp-2'>
                        {task.description}
                    </p>
                )}

                {task.tags?.length > 0 && (
                    <div className='flex gap-1 mt-2 flex-wrap'>
                        {task.tags.map(tag => (
                            <span key={tag} className='text-xs bg-white/10 text-orange-200 px-2 py-0.5 rounded-full'>
                                #{tag}
                            </span>
                        ))}
                    </div>
                )}

                {task.category?.length > 0 && (
                    <div className="flex gap-1 mt-2 flex-wrap">
                        {task.category.map(cat => (
                        <span key={cat} className='text-xs bg-white/5 text-orange-200/50 px-2 py-0.5 rounded-full'>
                            📂{cat}
                        </span>
                        ))}
                    </div>
                )}
            </div>

            <div className='flex items-center flex-shrink-0'>

                <div className='flex items-center pr-2'>
                    <TaskMenu 
                        task={task}
                        onEdit={onEdit}
                        onDelete={onSingleDelete}
                        onChangePriority={onChangePriority}
                        onDuplicate={onDuplicateTask}
                    />
                </div>


                <button
                onClick={() => onToggle(task._id, task.isCompleted)} 
                className='flex items-center pr-4 flex-shrink-0 cursor-pointer'
                >
                    <div className={`
                        w-6 h-6 rounded-full border-2
                        ${task.isCompleted 
                            ? 'bg-gray-400 border-gray-400'
                            : 'border-white/30'}
                        flex items-center justify-center cursor-pointer
                        hover:border-white/60 transition-all
                    `}>
                        {task.isCompleted && (
                            <Check size={14} strokeWidth={3} className="text-white" />
                        )}
                    </div>
                </button>
            </div>
        </div>
  )
}

export default TaskCard