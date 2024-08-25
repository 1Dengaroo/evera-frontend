import axios from 'axios'
import { useContext } from 'react'
import { UserCredentials } from '../../types'
import { AuthContext } from '../../context/AuthContext'
import { UserLoginResponse } from '../../types'

export const useUserLogin = () => {
  const { login } = useContext(AuthContext)

  const handleLogin = async (
    credentials: UserCredentials
  ): Promise<UserLoginResponse> => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/login`
      const response = await axios.post(url, { user: credentials })
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
