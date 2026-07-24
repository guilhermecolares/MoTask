import { useAuthStore } from "../stores/useAuthStore"
import { useTaskStore } from "../stores/useTaskStore"
import { User, Mail, Calendar, ListTodo } from "lucide-react"
import Breadcrumb from "../components/ui/Breadcrumb"

const Profile = () => {
  const user = useAuthStore(state => state.user)
  const userName = useAuthStore(state => state.userName)
  const createdAt = useAuthStore(state => state.createdAt)
  const tasks = useTaskStore(state => state.tasks)

  const totalTasks = tasks.length
  return (
    
    <div className="
    min-h-screen bg-gradient-to-br from-orange-950 via-orange-900/60 to-amber-950">
      <div className="text-white max-w-md mx-auto pt-10">
        <Breadcrumb to="/" label="Início" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-orange-500/20 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl font-poppins font-semibold text-amber-400">
              {userName?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>

          <h1 className="text-xl font-poppins font-semibold text-white mb-6">
            {userName || 'Usuário'}
          </h1>

          <div className="space-y-3 text-left">
            <div className="flex items-center gap-3 text-sm text-orange-200/70 bg-white/5 rounded-xl px-4 py-3">
              <User size={16} className="text-orange-400 flex-shrink-0"/>
              <span>{userName || 'Não informado'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-orange-200/70 bg-white/5 rounded-xl px-4 py-3">
              <Mail size={16} className="text-orange-400 flex-shrink-0"/>
              <span>{user?.email || 'Não informado'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-orange-200/70 bg-white/5 rounded-xl px-4 py-3">
              <Calendar size={16} className="text-orange-400 flex-shrink-0"/>
              <span>Membro desde {new Date(createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-orange-200/70 bg-white/5 rounded-xl px-4 py-3">
              <ListTodo size={16} className="text-orange-400 flex-shrink-0" />
              <span>{totalTasks} tarefas criadas</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
