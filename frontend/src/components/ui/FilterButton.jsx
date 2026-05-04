import { SlidersHorizontal } from 'lucide-react'

const FilterButton = () => {
  return (
      <button className='
      p-2 bg-white/5
      border border-white/10 rounded-xl
      hover:bg-white/10 transition-all duration-300
      text-white/70 hover:text-white cursor-pointer
      '
      aria-label='Filtros e Ordenação'>
        <SlidersHorizontal size={18}/>
      </button>
  )
}

export default FilterButton