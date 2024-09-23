import { useState } from 'react'
import axios from 'axios'
import { UserCredentials } from './types'

export const useUserSignup = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const signup = async (credentials: UserCredentials): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const url = `${process.env.REACT_APP_API_URL}/signup`

      await axios.post(url, {
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
