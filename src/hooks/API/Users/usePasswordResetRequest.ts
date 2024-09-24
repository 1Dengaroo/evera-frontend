import { useState } from 'react'
import axiosInstance from '../../../utils/axios/axiosInstance'

export const useRequestPasswordReset = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const requestPasswordReset = async (email: string): Promise<boolean> => {
    setLoading(true)
    setError(null)
    try {
      const response = await axiosInstance.post('/password', { email })
      setMessage(response.data.message)
      return true
    } catch (e: any) {
      setError(e.response?.data?.error || 'Something went wrong.')
      return false
    } finally {
      setLoading(false)
    }
  }

  return { requestPasswordReset, loading, error, message }
}
