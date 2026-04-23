import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../stores/useAuthStore'

const AuthPages = ({ pages }) => {
    const { isLogged } = useAuthStore()
    return isLogged ? pages : <Navigate to="/login" />
}

export default AuthPages