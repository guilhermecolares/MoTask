import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Breadcrumb = ({ to = -1, label = 'Voltar' }) => {
    const navigate = useNavigate()

    const handleClick = () => {
            navigate(to)
    }

    return (
        <button 
        onClick={handleClick}
        className="
        inline-flex items-center gap-2 text-white/60 hover:text-white 
        hover:bg-white/5 text-sm font-medium transition-colors cursor-pointer px-3 py-1.5 mb-6 rounded-lg">
            <ArrowLeft size={16} />
            {label}
        </button>
    )
}

export default Breadcrumb