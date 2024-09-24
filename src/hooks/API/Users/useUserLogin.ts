import { useContext } from 'react'
import { UserCredentials } from './types'
import { AuthContext } from '../../../context/AuthContext'
import { UserLoginResponse } from './types'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useUserLogin = () => {
  const { login } = useContext(AuthContext)

  const handleLogin = async (
    credentials: UserCredentials
  ): Promise<UserLoginResponse> => {
    try {
      const response = await axiosInstance.post('/login', { user: credentials })
      const token = response.headers['authorization']
      const user = response.data.status.data.user
      login(token, user)
      return { success: true, data: user }
    } catch (error) {
      return { success: false, data: null }
    }
  }

  return { handleLogin }
}
