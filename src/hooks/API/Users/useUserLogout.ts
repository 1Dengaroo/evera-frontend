import { useContext } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useUserLogout = () => {
  const { logout } = useContext(AuthContext)

  const handleLogout = async (): Promise<boolean> => {
    try {
      await axiosInstance.delete('/logout')
      logout()
      return true
    } catch {
      logout()
      return true
    }
  }

  return { handleLogout }
}
