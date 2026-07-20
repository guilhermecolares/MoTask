export const Skeleton = ({ className = ''}) => {
    return (
        <div className={`bg-white/[0.05] rounded-2xl animate-pulse ${className}`}/>
    )
}