const Card = ({ title, description}) => (
  <div className={`
    bg-white/10 rounded-3xl shadow-md cursor-pointer
    flex items-start flex-col border border-white/0
    active:scale-[1.02] active:shadow-lg active:border-white/20
    sm:hover:scale-[1.02] sm:hover:shadow-lg sm:hover:border-white/20
    transition-all duration-300 p-6 lg:p-8
    font-poppins h-full
  `}>
    <h2 className='font-bold text-3xl text-white mb-3'>{title}</h2>
    <p className='font-medium text-lg text-orange-100/80'>{description}</p>
  </div>
)

export default Card