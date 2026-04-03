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
                  className="font-poppins font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md
                             bg-slate-200 text-slate-900 
                             hover:bg-white hover:shadow-xl
                             transition-all duration-300
                             active:scale-95"
                >
                  LOGIN
                </button>
                
                <button 
                  className="font-poppins font-semibold text-sm px-5 py-2.5 
                             border border-white/30 rounded-xl 
                             bg-white/5 text-white/80
                             hover:bg-white/15 hover:border-white/50
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

      <main className="max-w-6xl mx-auto px-6
      py-10 lg:py-20
      ">
        <div className="grid
        grid-cols-1 lg:grid-cols-4
        grid-rows-1 lg:grid-rows-2
        gap-4 lg:gap-8
        h-[60vh] lg:h-[400px]
        ">
          
          <button className=" shadow-md
          col-span-1 lg:col-span-2
          row-span-1 lg:row-span-2
           bg-white/10 rounded-3xl 
          p-6 lg:p-8
          flex items-start flex-col
          hover:scale-105
          transition-all duration-300
           ">
            <h2 className='font-poppins font-bold text-2xl text-slate-900'>CRIAR TAREAS</h2>
            <p>Crie novas tarefas com prioridade e prazos.</p>
          </button>
          
          <button className="
          col-span-1 lg:col-span-2
          row-span-1 bg-white/10 rounded-3xl
          p-6 lg:p-8
          mt-4 lg:mt-0
          ">
            MINHAS TAREFAS
          </button>
          
          <button className="
          col-span-1 lg:col-span-2
          row-span-1 bg-white/10 rounded-3xl
          p-6 lg:p-8
          mt-4 lg:mt-0
          ">
            AGENDAMENTOS
          </button>
          
        </div>
      </main>
    </div>

  )
}

export default App