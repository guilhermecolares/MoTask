import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isLogged: true,
      userName: 'Guilherme',
      login: (name) => set({ isLogged: true, userName: name }),
      logout: () => set({ isLogged: false, userName: '' })
    }),
    { name: 'motask-auth' }
  )
)