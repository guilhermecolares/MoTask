import { Trash2, RotateCcw } from 'lucide-react'

const SelectionFABS = ({ selectedCount, onDelete, onReset }) => {
  return (
    <div className='
    fixed bottom-6 left-1/2 -translate-x-1/2 z-50
    flex items-center gap-3
    animate-slide-up
    '
    aria-label='Botões para seleção de redefinir ou excluir'
    >
      <button 
        onClick={onReset}
        className='
        flex items-center gap-2 px-5 py-3 rounded-2xl
        bg-white/10 text-white/80
        font-poppins text-sm font-medium
        hover:bg-white/20 active:scale-95
        transition-all duration-300 cursor-pointer
        '
        aria-label='Botão para redefinir seleção de botões'
      >
        <RotateCcw size={18}/>
        <span>Redefinir</span>
      </button>

      <button
      onClick={onDelete}
      disabled={selectedCount === 0}
      className={`
        flex items-center gap-2 px-5 py-3 rounded-2xl
        font-poppins text-sm font-medium
        transition-all duration-300 cursor-pointer
        ${selectedCount === 0
          ? `bg-white/5 text-white/30 cursor-not-allowed`
          : `bg-red-500/80 text-white hover:bg-red-500 active:scale-95`
        }
        `}
      aria-label='Botão para excluir tarefas selecionadas'
      >
        <Trash2 size={18}/>
        <span>Excluir ({selectedCount})</span>
      </button>

    </div>
  )
}

export default SelectionFABS