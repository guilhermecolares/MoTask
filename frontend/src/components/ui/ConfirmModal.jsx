import { AlertTriangle, X } from "lucide-react"

const ConfirmModal = ({ isOpen, title, message, onConfirm, onCancel, count }) => {
    if (!isOpen) return null

  return (
    <div 
    className="fixed inset-0 z-50 flex items-center justify-center">

      <div 
      onClick={onCancel}
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div 
      className="
      relative bg-gradient-to-br from-orange-950 to-amber-950
      border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4
      shadow-2xl animate-fade-in z-10
      ">

        <div className="flex items-start gap-4 mb-4">
            <div className="p-2 bg-red-500/20 rounded-full flex-shrink-0">
                <AlertTriangle size={24} className="text-red-400"/>
            </div>
            
            <div>
                <h3 className="text-white font-poppins font-semibold text-lg">
                    {title || 'Confirmar Exclusão'}
                </h3>
                <p className="text-orange-200/70 text-sm mt-1">
                    {message || `Deseja excluir ${count} tarefa(s)? Esta ação não pode ser desfeita futuramente.`}
                </p>
            </div>
        </div>

        <div className="flex gap-3 justify-end">
            <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl bg-white/10
            font-poppins text-sm font-medium text-white/80
            hover:bg-white/20 active:scale-95
            transition-all duration-300 cursor-pointer
            ">
                Cancelar
            </button>
            <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl bg-red-500/80
            font-poppins text-sm font-medium text-white
            hover:bg-red-500 active:scale-95
            transition-all duration-300 cursor-pointer
            ">
                Excluir
            </button>
        </div>

      </div>
    </div>
  )
}

export default ConfirmModal