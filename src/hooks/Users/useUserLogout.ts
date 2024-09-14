import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { setAuthToken } from '../../utils/auth/setAuthToken'

export const useUserLogout = () => {
  const { logout } = useContext(AuthContext)

  const handleLogout = async (): Promise<boolean> => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/logout`
      const token = localStorage.getItem('jwtToken')
      setAuthToken(token)
      await axios.delete(url)
      logout()
      return true
    } catch (error: any) {
      logout()
      return true
    }
  }

  return { handleLogout }
}
