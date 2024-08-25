import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { setAuthToken } from './setAuthToken' // Assuming you have this function to manage the token

export const useUserLogout = () => {
  const { logout } = useContext(AuthContext) // Use useContext inside a React component or hook

  const handleLogout = async (): Promise<boolean> => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/logout`

      // Set the Authorization header using the token from localStorage
      const token = localStorage.getItem('jwtToken')
      if (token) {
        axios.defaults.headers.common['Authorization'] = token
      }

      // Perform the API logout
      await axios.delete(url)

      // Clear the localStorage and remove the Authorization header
      localStorage.removeItem('jwtToken')
      localStorage.removeItem('user')
      setAuthToken(null)

      // Call the logout function from AuthContext to update the state
      logout()

      return true
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  }

  return { handleLogout }
}
