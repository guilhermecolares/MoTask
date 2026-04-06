import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [userName] = useState('Guilherme')

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-950 via-orange-900/50 to-amber-950 flex flex-col'>
      
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">
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
              <Link to="/profile" className="font-poppins font-medium text-sm text-orange-100 bg-orange-500/20
                cursor-pointer border border-orange-400/30
                px-5 py-2.5 rounded-xl backdrop-blur-sm shadow-md
                 hover:bg-orange-500/30 hover:shadow-xl active:scale-100
                transition-all duration-300
              ">
                Olá, {userName}! 👋
              </Link>
            )}
            
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-10 lg:py-20">
        <Outlet />
      </main>

      <footer className="border-t border-white/10 mt-10 pt-12 pb-8">
        <div className="max-w-xl mx-auto px-6 text-center">
          <p className="font-poppins text-orange-200/70 text-sm">
            © 2026 MoTask. Feito com ❤️ Guilherme Colares.
          </p>
        </div>
      </footer>
    </div>

  )
}

export default App