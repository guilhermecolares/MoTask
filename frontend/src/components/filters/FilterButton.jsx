import { useState } from 'react'
import FilterMenu from './FilterMenu'

import { SlidersHorizontal } from 'lucide-react'


const FilterButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
      <div className='relative'>
        <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className='p-2 bg-white/5 relative z-50
        border border-white/10 rounded-xl
        hover:bg-white/10 transition-all duration-300
        text-white/70 hover:text-white cursor-pointer
        '
        title='Filtros e Ordenação'
        aria-label='Filtros e Ordenação'>
          <SlidersHorizontal size={18}/>
        </button>

        <FilterMenu 
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      </div>
  )
}

export default FilterButton