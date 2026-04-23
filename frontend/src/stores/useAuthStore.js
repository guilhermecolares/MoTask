import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useAuthStore = create(
  persist(
    (set) => ({
      isLogged: false,
      userName: '',
      login: (name) => set({ isLogged: true, userName: name }),
      logout: () => set({ isLogged: false, userName: '' })
    }),
    { name: 'motask-auth' }
  )
)