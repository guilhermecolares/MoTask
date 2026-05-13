import { create } from 'zustand'

const getDefaultColumns = () => {
    if (typeof window === 'undefined') return 1

    const width = window.innerWidth

    if (width >= 1024) return 3
    if (width >= 640) return 2
    return 1
}

export const useFilterStore = create((set) => ({
    sortBy: 'recentes',
    filterPriority: [],
    filterCategory: [],
    columns: getDefaultColumns(),

    setSortBy: (value) => set({ sortBy: value }),

    togglePriority: (priority) => set((state) => ({
        filterPriority: state.filterPriority.includes(priority)
        ? state.filterPriority.filter(p => p !== priority)
        : [...state.filterPriority, priority]
    })),

    toggleCategory: (category) => set((state) => ({
        filterCategory: state.filterCategory.includes(category)
        ? state.filterCategory.filter(c => c !== category)
        : [...state.filterCategory, category]
    })),

    setColumns: (num) => set({ columns: num }),

    clearFilter: () => set({
        sortBy: 'recentes',
        filterPriority: [],
        filterCategory: [],
        columns: getDefaultColumns(),
    }),
}))