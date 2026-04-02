import { useState } from 'react'

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [userName] = useState('Guilherme')

  return (
    <div className='min-h-screen bg-gradient-to-br from-orange-950 via-orange-900/50 to-amber-950'>
      
      <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-sm">

        <div className="max-w-xl mx-auto px-6 py-5 flex justify-center items-center">
          <div className="flex items-center gap-3 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl px-3 py-2 shadow-lg">
            
            {!isLogged ? (
              <>
                <button 
                  className="font-poppins font-semibold text-sm px-5 py-2.5 rounded-xl 
                             bg-slate-200 text-slate-900 
                             hover:bg-white hover:shadow-xl
                             transition-all duration-300 shadow-md
                             active:scale-95"
                >
                  LOGIN
                </button>
                
                <button 
                  className="font-poppins font-semibold text-sm px-5 py-2.5 
                             border border-white/30 
                             bg-white/5
                             text-white/80
                             hover:bg-white/15 hover:border-white/50
                             rounded-xl 
                             transition-all duration-300 shadow-md
                             active:scale-95"
                >
                  REGISTRO
                </button>
              </>
            ) : (
              <div className="font-poppins font-medium text-sm text-orange-100 
                              bg-orange-500/20 cursor-pointer
                              border border-orange-400/30 
                              px-5 py-2.5 rounded-xl 
                              backdrop-blur-sm
                              hover:bg-orange-500/30 hover:shadow-xl
                              transition-all duration-300 shadow-md
                              active:scale-100">
                Olá, {userName}! 👋
              </div>
            )}
            
          </div>
        </div>
      </header>

    </div>
  )
}

export default App