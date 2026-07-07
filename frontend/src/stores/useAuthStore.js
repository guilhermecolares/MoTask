import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLogged: false,
      userName: '',

      login: async (email, password) => {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        })

        const data = await response.json()
        if (!data.success) throw new Error(data.error)

        set({
          user: data.user,
          token: data.token,
          isLogged: true,
          userName: data.user.name
        })
        localStorage.setItem('token', data.token)
      },

      register: async (name, email, password) => {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, password })
        })

        const data = await response.json()
        if (!data.success) throw new Error(data.error)

        set({
          user: data.user,
          token: data.token,
          isLogged: true,
          userName: data.user.name
        })
        localStorage.setItem('token', data.token)
      },

      logout: () => {
        set({
          user: null,
          token: null,
          isLogged: false,
          userName: ''
        })
        localStorage.removeItem('token')
      }
    }),
    { name: 'motask-auth' }
  )
)