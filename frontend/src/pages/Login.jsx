import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, UserPlus, Eye, EyeOff, UserCheck } from 'lucide-react'
import { useAuthStore } from '../stores/useAuthStore.js'

const Login = () => {
  const navigate = useNavigate()
  const login = useAuthStore(state => state.login)
  const register = useAuthStore(state => state.register)

  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        await register(name, email, password)
      }
      navigate('/')
    } catch (err) {
      setError(err.message || 'Erro ao processar. Tente Novamente!')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='
    min-h-screen bg-gradient-to-br from-orange-950 via-orange-900/60 to-amber-950
    flex items-center justify-center py-5 md:py-20
    '>
      <div className='flex flex-col md:flex-row rounded-2xl overflow-hidden border border-white/10 shadow-2xl max-w-2xl w-full'>
        <div className='w-full md:w-1/2 p-8 bg-gradient-to-br from-orange-950 to-amber-950 overflow-hidden relative'>  
          <div 
          key={isLogin ? 'login' : 'register'} 
          className='animate-fade-in'>
            <div className='flex items-center gap-2 mb-8'>
              <div className='
              w-8 h-8 rounded-lg bg-orange-500/20
              flex items-center justify-center
              '>
                <LogIn size={18} className='text-orange-400'/>
              </div>
              <h1 className='text-xl font-poppins font-semibold text-white'>MoTask</h1>
            </div>

            <form onSubmit={handleSubmit} className='space-y-4'>
              {!isLogin && (
                <div>
                  <label className='block text-white/60 text-sm mb-1.5 uppercase tracking-wider'>Nome</label>

                  <input 
                  type="text"
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  placeholder='Seu nome'
                  required
                  className='
                  w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                  text-white text-sm placeholder:text-white/20 outline-none
                  focus:border-white/30 transition-all
                  '/>
                </div>
              )}

              <div>
                <label className='block text-white/60 text-sm mb-1.5 uppercase tracking-wider'>Email</label>

                <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='seu@email.com'
                required
                className='
                w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5
                text-white text-sm placeholder:text-white/20 outline-none
                focus:border-white/30 transition-all
                ' />
              </div>

              <div>
                <label className='block text-white/60 text-sm mb-1.5 uppercase tracking-wider'>Senha</label>

                <div className='relative'>
                  <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  minLength={6}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="
                  w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10
                  text-white text-sm placeholder:text-white/20 outline-none
                  focus:border-white/30 transition-all
                  "/>

                  <button
                  type='button'
                  onClick={() => setShowPassword(!showPassword)}
                  className='
                  absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors
                  '>
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error &&  (
                <p className='text-red-400 text-sm text-center'>{error}</p>
              )}

              <button
              type='submit'
              disabled={isLoading}
              className='
              w-full py-2.5 rounded-xl bg-orange-500/80 text-white
              font-poppins text-sm font-medium
              hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all flex items-center justify-center gap-2
              '>
                {isLogin ? <LogIn size={16} /> : <UserPlus size={16} />}
                {isLoading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar Conta'}
              </button>

              <button
              type='button'
              onClick={async () => {
                try {
                  await login('demo@motask.com', 'demo123')
                  navigate('/')
                } catch (err) {
                  setError('Erro ao entrar com conta demo.', err)
                }
              }}
              className='
              flex items-center justify-center gap-2
              w-full py-2.5 rounded-xl bg-white/5 border border-white/10
              text-white/50 text-sm hover:bg-white/10 hover:text-white/70
              active:scale-95 transition-all mt-4'>
                <UserCheck size={16}/>
                Entrar com conta Demo
              </button>
            </form>
          </div>
        </div>

        <div className='w-full md:w-1/2 p-8 bg-white/5 flex flex-col items-center justify-center text-center'>
              {isLogin ? (
                <div className='space-y-4'>
                  <h2 className='text-2xl font-poppins font-semibold text-white'>Bem-vindo de volta!</h2>
                  <p className='text-orange-200/70 text-sm'>Ainda não tem uma conta?</p>
                  <button
                  onClick={() => { setIsLogin(false); setError('') }}
                  className='
                  px-6 py-2.5 rounded-xl border border-orange-400/30 text-orange-300
                  font-poppins text-sm font-medium
                  hover:bg-orange-500/10 transition-all
                  '>
                    Criar Conta
                  </button>
                </div>
              ) : (
                <div className='space-y-4'>
                  <h2 className='text-2xl font-poppins font-semibold text-white'>Olá, novo usuário!</h2>
                  <p className='text-orange-200/70 text-sm'>Já tem uma conta?</p>
                  <button
                  onClick={() => { setIsLogin(true); setError('') }}
                  className='
                  px-6 py-2.5 rounded-xl border border-orange-400/30 text-orange-300
                  font-poppins text-sm font-medium
                  hover:bg-orange-500/10 transition-all
                  '>
                    Fazer Login
                  </button>
                </div>
              )}
          </div>
      </div>
    </div>
  )
}

export default Login