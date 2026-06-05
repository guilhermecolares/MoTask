import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/useAuthStore'

const AuthPages = ({ children }) => {
    const { isLogged } = useAuthStore()
    return isLogged ? children : <Navigate to="/login" />
}

export default AuthPages