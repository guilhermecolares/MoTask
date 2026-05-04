import { Search } from "lucide-react"

const SearchBar = () => {
  return (
    <div className="flex-1 relative">
      <Search
        size={16}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
        aria-label="Ícone Pesquisar"
      />
      <input
        type="text"
        placeholder="Buscar tarefas..."
        className="
        w-full pl-9 pr-4 py-2.5
         bg-white/5 border border-white/10 rounded-xl
         text-white text-sm placeholder:text-white/30 outline-none
         focus:outline-none focus:border-white/30 focus:bg-white/10
         transition-all duration-300
        "
        aria-label="Campo de busca por tarefas"
      />
    </div>
  )
}

export default SearchBar
