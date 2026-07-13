import { useAuthStore } from './stores/useAuthStore'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'

const App = () => {
  const { isLogged, userName } = useAuthStore()

  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-950 via-orange-900/60 to-amber-950 flex flex-col relative'>

      <header className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
        <div className="max-w-xl mx-auto px-6 py-5 flex justify-center items-center">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2 shadow-lg">
            
            {!isLogged ? (
              <>
                <Link to="/login" className="
                  font-poppins font-semibold text-sm text-slate-900
                  px-5 py-2.5 
                   bg-slate-200 rounded-xl shadow-md
                   hover:bg-white hover:shadow-xl active:scale-95
                  transition-all duration-300
                  ">
                  LOGIN
                </Link>
                
                <Link to="/login" className="
                  font-poppins font-semibold text-sm text-white/80
                  border border-white/30 bg-white/5
                  px-5 py-2.5 rounded-xl shadow-md
                   hover:bg-white/15 hover:border-white/50 active:scale-95
                  transition-all duration-300
                  ">
                  REGISTRO
                </Link>
              </>
            ) : (
              <div className='flex items-center gap-2'>
                <Link 
                to="/profile" 
                className="
                font-poppins font-medium text-sm text-orange-100 bg-orange-500/20
                cursor-pointer border border-orange-400/30
                px-5 py-2.5 rounded-xl backdrop-blur-sm shadow-md
                hover:bg-orange-500/30 hover:shadow-xl active:scale-100
                transition-all duration-300
                "
                title='Perfil'
                aria-label='Botão para ir ao seu Perfil.'
                >
                  Olá, {userName.split(' ')[0]}! 👋
                </Link>
                <button
                onClick={() => {
                  useAuthStore.getState().logout()
                  navigate('/login')
                }}
                className='
                p-2 rounded-xl bg-white/5 border border-white/10
                text-white/40 hover:text-red-400 hover:bg-white/10
                transition-all duration-300 cursor-pointer
                '
                title='Sair'
                aria-label='Botão para sair da conta logada.'>
                  <LogOut size={16}/>
                </button>
              </div>
            )}
            
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-6 py-4 lg:py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default App