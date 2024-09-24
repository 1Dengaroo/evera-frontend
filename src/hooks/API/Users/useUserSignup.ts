import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'
import { UserCredentials } from './types'

export const useUserSignup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (credentials: UserCredentials): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      await axiosInstance.post('/signup', {
        user: credentials
      })

      return true
    } catch (e: any) {
      setError(e.response?.data?.status?.message || 'Signup failed.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { signup, loading, error }
}
