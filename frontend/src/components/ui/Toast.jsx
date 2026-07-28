import {  CheckCircle, XCircle, X } from 'lucide-react'
import { useToastStore } from '../../stores/useToastStore'

const Toast = () => {
    const { message, type, isVisible } = useToastStore()

    return (
        <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
            <div className={`flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl
                ${type === 'success'
                    ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                    : 'bg-red-500/20 border border-red-500/30 text-red-400'
                }`}>
                {type === 'success'
                    ? <CheckCircle size={18} />
                    : <XCircle size={18} />
                }
                <span className='text-sm font-medium'>{message}</span>
            </div>
        </div>
    )
}

export default Toast